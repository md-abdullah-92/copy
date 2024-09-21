package org.sust_unknowns.javafest.productservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.sust_unknowns.javafest.productservices.model.Product;
import org.sust_unknowns.javafest.productservices.repository.ProductRepository;
import java.util.regex.Matcher;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/")
    public String home() {
        return "Spring Boot App is Running";
    }

    @PostMapping("/addproduct")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        System.out.println("Product: " + product.getOwnerid());
        try {
            productRepository.save(product);
            return ResponseEntity.ok().body("Product added: " + product.getProductname() + product.getOwnerid());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add product: " + e.getMessage());
        }
    }

    @PutMapping("/updateproduct")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        try {
            productRepository.save(product);
            return ResponseEntity.ok().body("Product updated: " + product.getProductname());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product: " + e.getMessage());
        }
    }

    @GetMapping("/getsameownerproduct")
    public ResponseEntity<List<Product>> getSameOwnerProduct(@RequestParam String owneremail) {
        try {
            List<Product> products = productRepository.findByOwneremail(owneremail);
            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok().body(products);
        } catch (Exception e) {
            log.error("Failed to retrieve products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/updateproductquantity")
    public ResponseEntity<String> updateProductQuantity(@RequestParam String id, @RequestParam String quantity) {

        System.out.println("id: " + id);
        System.out.println("quantity: " + quantity);

        try {
            if (id == null || id.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required parameter: id");
            }
            if (quantity == null || quantity.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required parameter: quantity");
            }

            Optional<Product> productOptional = productRepository.findById(id);
            if (productOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            Product product = productOptional.get();

            // Ensure totalsold is not null or empty, set default value if necessary
            String totalSoldStr = product.getTotalsold();
            if (totalSoldStr == null || totalSoldStr.isEmpty()) {
                totalSoldStr = "0"; // Default to "0" if totalsold is not set
                product.setTotalsold(totalSoldStr);
            }

            // Ensure quantity is not null or empty, handle error if necessary
            String quantityOldStr = product.getQuantity();
            if (quantityOldStr == null || quantityOldStr.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product quantity is not set or invalid");
            }

            // Extract numbers and units from strings
            String quantityOldNumber = extractNumber(quantityOldStr);
            String quantityOldUnit = extractUnit(quantityOldStr);

            String totalSoldNumber = extractNumber(totalSoldStr);
            String totalSoldUnit = extractUnit(totalSoldStr);

            // Check if the units of totalsold and quantityOld are the same
            if (!quantityOldUnit.equals(totalSoldUnit) && !totalSoldUnit.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Units do not match for totalsold and quantity");
            }

            int totalSoldInt;
            int quantityInt;
            int quantityOldInt;

            try {
                totalSoldInt = Integer.parseInt(totalSoldNumber);
                quantityInt = Integer.parseInt(quantity);
                quantityOldInt = Integer.parseInt(quantityOldNumber);
            } catch (NumberFormatException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid number format: " + e.getMessage());
            }

            int quantityNew = quantityOldInt - quantityInt;

            if (quantityNew < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient product quantity");
            }

            // Reattach the unit to the new quantity value
            String updatedQuantityStr = quantityNew + (quantityOldUnit.isEmpty() ? "" : " " + quantityOldUnit);

            // Update totalsold with the unit
            int newTotalSold = totalSoldInt + quantityInt;
            String updatedTotalSoldStr = newTotalSold + (quantityOldUnit.isEmpty() ? "" : " " + quantityOldUnit);

            product.setTotalsold(updatedTotalSoldStr);
            product.setQuantity(updatedQuantityStr);
            productRepository.save(product);

            return ResponseEntity.ok("Product quantity updated: " + product.getProductname());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product quantity: " + e.getMessage());
        }
    }

    // Helper method to extract the numeric part from a string
    private String extractNumber(String input) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        }
        return "0"; // Default to "0" if no number is found
    }

    // Helper method to extract the unit part from a string
    private String extractUnit(String input) {
        Pattern pattern = Pattern.compile("[a-zA-Z]+");
        Matcher matcher = pattern.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        }
        return ""; // Default to empty if no unit is found
    }

    // Get product
    @GetMapping("/getproduct")
    public ResponseEntity<Product> getProduct(@RequestParam String id) {
        try {
            Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok().body(product.get());
        } catch (Exception e) {
            log.error("Failed to retrieve product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Remove product
    @PostMapping("/removeproduct")
    public ResponseEntity<?> removeProduct(@RequestBody Product product) {
        try {
            productRepository.deleteById(product.getId());
            return ResponseEntity.ok().body("Product removed: " + product.getProductname());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to remove product: " + e.getMessage());
        }
    }

    // Get all products
    @GetMapping("/allproducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.ok().body(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete product
    @DeleteMapping("/deleteproduct")
    public ResponseEntity<?> deleteProduct(@RequestParam String id) {
        System.out.println("id: " + id);
        if (!productRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found: " + id);
        }
        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok().body("Product deleted: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete product: " + e.getMessage());
        }
    }

    // edit product
    @PutMapping("/editproduct")
    public ResponseEntity<?> editProduct(@RequestBody Product product) {
        try {
            if (productRepository.existsById(product.getId())) {
                productRepository.save(product);
                return ResponseEntity.ok().body("Product edited: " + product.getProductname());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to edit product: " + e.getMessage());
        }
    }

    // rate product
    @PutMapping("/rateproduct")
    public ResponseEntity<?> rateProduct(@RequestParam String id, @RequestParam String rating,
            @RequestParam String soldproduct) {
        try {
            Optional<Product> productOptional = productRepository.findById(id);
            if (productOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            Product product = productOptional.get();
            String ratingOld = product.getRating();
            if (ratingOld == null || ratingOld.isEmpty() || ratingOld.equals("undefined")) {
                ratingOld = "0";
            }
            String totalratingOld = product.getTotalrating();
            if (totalratingOld == null || totalratingOld.isEmpty() || totalratingOld.equals("undefined")) {
                totalratingOld = "0";
            }
            int totalratingInt = Integer.parseInt(totalratingOld);
            int ratingOldInt = Integer.parseInt(ratingOld);
            int soldproductInt = Integer.parseInt(soldproduct);
            int ratingInt = Integer.parseInt(rating);

            int totalratingNew = (totalratingInt + soldproductInt);
            int ratingNew = (ratingOldInt * totalratingInt + ratingInt * soldproductInt) / totalratingNew;
            product.setTotalrating(Integer.toString(totalratingNew));
            product.setRating(Integer.toString(ratingNew));
            productRepository.save(product);

            return ResponseEntity.ok().body("Product rated: " + product.getProductname());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to rate product: " + e.getMessage());
        }
    }

}
