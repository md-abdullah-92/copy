package org.sust_unknowns.javafest.productservices.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.sust_unknowns.javafest.productservices.model.Cartproduct;
import org.sust_unknowns.javafest.productservices.repository.CartproductRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/cart")
@Slf4j
public class CartproductController {

    @Autowired
    private CartproductRepository cartproductRepository;

    @PostMapping("/addtocart")
    public ResponseEntity<?> addCartproduct(@RequestBody Cartproduct cartproduct) {
        log.info("Adding product to cart: {}", cartproduct);
        System.out.println("cartproduct: " + cartproduct.getId());
        try {

            cartproductRepository.save(cartproduct);
            return ResponseEntity.ok().body("Sold Product added: " + cartproduct.getId());
        } catch (Exception e) {
            log.error("Failed to add sold product", e); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add sold product: " + e.getMessage());
        }
    }

    @GetMapping("/cartproducts")
    public ResponseEntity<List<Cartproduct>> getCartProducts(@RequestParam String email) {
        try {
            System.out.println("buyeremail: " + email);
            List<Cartproduct> cartproducts = cartproductRepository.findByEmail(email);
            if (cartproducts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok().body(cartproducts);
        } catch (Exception e) {
            log.error("Failed to retrieve products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // remove product
    @PostMapping("/removeproduct")
    public ResponseEntity<?> removeProduct(@RequestParam String id, @RequestParam String email) {
        // Validate inputs
        if (id == null || id.isEmpty() || email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Product ID and email must be provided.");
        }

        try {
            // Execute the deletion
            int deletedCount = cartproductRepository.deleteByIdAndEmail(id, email);

            // Check if the deletion was successful
            if (deletedCount > 0) {
                return ResponseEntity.ok().body("Product removed from cart: " + id);
            } else {
                // If no products were deleted, respond with a NOT_FOUND status
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Product not found for the given ID and email.");
            }
        } catch (Exception e) {
            // Log the error and return an INTERNAL_SERVER_ERROR status
            log.error("Failed to remove product", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to remove product: " + e.getMessage());
        }
    }

}
