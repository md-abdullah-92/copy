package org.sust_unknowns.javafest.productservices.controller;

import org.sust_unknowns.javafest.productservices.model.Productcomment;
import org.sust_unknowns.javafest.productservices.repository.ProductcommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Slf4j
public class ProductcommentController {

    @Autowired
    private ProductcommentRepository productcommentRepository;

    @PostMapping("/add")
    public String addComment(@RequestBody Productcomment productcomment) {
        log.info("Adding comment to product with id: " + productcomment.getProductid());
        productcommentRepository.save(productcomment);
        return "Comment added successfully";
    }

    // get comments by product id
    @GetMapping("/get")
    public List<Productcomment> getCommentsByProductid(@RequestParam String productid) {
        log.info("Getting comments for product with id: " + productid);
        return productcommentRepository.findByProductid(productid);
    }
}
