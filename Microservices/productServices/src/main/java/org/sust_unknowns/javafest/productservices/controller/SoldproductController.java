package org.sust_unknowns.javafest.productservices.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.sust_unknowns.javafest.productservices.model.Soldproduct;
import org.sust_unknowns.javafest.productservices.repository.SoldproductRepository;
import org.sust_unknowns.javafest.productservices.service.MailService;
import org.sust_unknowns.javafest.productservices.utils.codeGenarator;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/soldproduct")
@Slf4j
public class SoldproductController {

    // Inject SoldproductRepository
    @Autowired
    private SoldproductRepository soldproductRepository;

    private final MailService mailService;

    private final codeGenarator codeGenarator;

    public SoldproductController(MailService mailService) {
        this.mailService = mailService;
        this.codeGenarator = new codeGenarator();

    }

    @PostMapping("/addsoldproduct")
    public ResponseEntity<?> addSoldProduct(@RequestBody Soldproduct soldproduct) {
        try {
            soldproductRepository.save(soldproduct);
            return ResponseEntity.ok().body("Sold Product added: " + soldproduct.getProductid());
        } catch (Exception e) {
            log.error("Failed to add sold product", e); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add sold product: " + e.getMessage());
        }
    }

    @GetMapping("/soldproducts")

    public ResponseEntity<List<Soldproduct>> getSoldProducts(@RequestParam String buyeremail) {
        try {
            System.out.println("buyeremail: " + buyeremail);
            List<Soldproduct> soldproducts = soldproductRepository.findByBuyeremail(buyeremail);
            if (soldproducts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok().body(soldproducts);
        } catch (Exception e) {
            log.error("Failed to retrieve products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/orderproducts")

    public ResponseEntity<List<Soldproduct>> getOrderProducts(@RequestParam String selleremail) {
        try {
            System.out.println("buyeremail: " + selleremail);
            List<Soldproduct> soldproducts = soldproductRepository.findBySelleremail(selleremail);
            if (soldproducts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok().body(soldproducts);
        } catch (Exception e) {
            log.error("Failed to retrieve products: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/updatestatus")
    public ResponseEntity<?> updateStatus(@RequestParam String id, @RequestParam String deliverystatus) {
        System.out.println("id: " + id);
        System.out.println("status: " + deliverystatus);
        try {
            // Use Optional's isPresent() to check if the product exists
            Optional<Soldproduct> optionalSoldProduct = soldproductRepository.findById(id);
            if (!optionalSoldProduct.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            // Retrieve the actual Soldproduct object from the Optional
            Soldproduct soldProduct = optionalSoldProduct.get();
            if (soldProduct.getDeliverystatus().equals("Delivered")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product already delivered");
            }

            soldProduct.setDeliverystatus(deliverystatus);
            if (deliverystatus.equals("Delivered")) {
                mailService.sendMail(soldProduct.getBuyeremail(), "Agribazaar - Product Delivered",
                        "Your product has been delivered. Thank you for shopping with us.");
            } else if (deliverystatus.equals("On the Road")) {
                soldProduct.setCode(codeGenarator.generateCode());
                System.out.println("code: " + soldProduct.getCode());
                soldProduct.setIsverified(false);
                mailService.sendMail(soldProduct.getBuyeremail(), "Agribazaar - Product on the way",
                        formatTheMessage(soldProduct.getCode(), soldProduct.getName(), soldProduct.getId()));

            } else if (deliverystatus.equals("Waiting for Pickup")) {
                mailService.sendMail(soldProduct.getBuyeremail(), "Agribazaar - Product waiting for pickup",
                        "Your product is waiting for pickup. Please pick it up as soon as possible.");

            } else if (deliverystatus.equals("Packaging Done")) {
                System.out.println("selleremail: " + soldProduct.getSelleremail());
                mailService.sendMail(soldProduct.getBuyeremail(), "Agribazaar - Product packaging done",
                        "Your product has been packaged. Please wait for the delivery.");

            }

            soldproductRepository.save(soldProduct);

            return ResponseEntity.ok().body("Status updated: " + soldProduct.getDeliverystatus());
        } catch (Exception e) {
            log.error("Failed to update status", e); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update status: " + e.getMessage());
        }

    }

    // get the product by id
    @GetMapping("/getproduct")
    public ResponseEntity<?> getProduct(@RequestParam String id) {
        try {
            // Use Optional's isPresent() to check if the product exists
            Optional<Soldproduct> optionalSoldProduct = soldproductRepository.findById(id);
            if (!optionalSoldProduct.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            // Retrieve the actual Soldproduct object from the Optional
            Soldproduct soldProduct = optionalSoldProduct.get();
            return ResponseEntity.ok().body(soldProduct);
        } catch (Exception e) {
            log.error("Failed to get product", e); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get product: " + e.getMessage());
        }

    }

    // verify the otp code
    @PutMapping("/verifycode")
    public ResponseEntity<?> verifyCode(@RequestParam String id, @RequestParam String code) {
        System.out.println("id: " + id);
        System.out.println("code: " + code);
        try {
            // Use Optional's isPresent() to check if the product exists
            Optional<Soldproduct> optionalSoldProduct = soldproductRepository.findById(id);
            if (!optionalSoldProduct.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            // Retrieve the actual Soldproduct object from the Optional
            Soldproduct soldProduct = optionalSoldProduct.get();
            if (soldProduct.getDeliverystatus().equals("Delivered")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product already delivered");
            }

            if (soldProduct.getCode().equals(code)) {
                soldProduct.setIsverified(true);
                String currenttime = System.currentTimeMillis() + "";
                soldProduct.setDeliverytime(currenttime);
                soldProduct.setDeliverystatus("Delivered");
                mailService.sendMail(soldProduct.getBuyeremail(), "Agribazaar - Product Delivered",
                        "Your product has been delivered. Thank you for shopping with us.");
                soldproductRepository.save(soldProduct);

                return ResponseEntity.ok().body("Code verified");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid code");
            }

        } catch (Exception e) {
            log.error("Failed to verify code", e); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to verify code: " + e.getMessage());
        }

    }

    // Method to format the message for the email
    // otp sending text for delivery verification
    private String formatTheMessage(String code, String productname, String productid) {

        return "<html>" +
                "<head></head>" +
                "<body>" +
                "<div class='container'>" +
                "<h1><span style='color: #425119; font-family: Caveat, cursive;'> AgriBazaar </span></h1>" +
                "<p>Hi, Welcome to AgriBazaar</p>" +
                "<p>Dear Customer,</p>" +
                "<p>Your product <b>" + productname + "</b> with ID <b>" + productid + "</b> is on the way.</p>" +
                "<p>Your verification code is: <b>" + code + "</b></p>" +
                "<p>Visit our website at <a href='https://agribazaar.vercel.app'>www.agribazaar.com</a></p>" +
                "</div>" +
                "</body>" +
                "</html>";

    }

}
