package org.sust_unknowns.javafest.productservices.repository;

import org.sust_unknowns.javafest.productservices.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    Product findTopByOrderByIdDesc();

    Product findTopByOrderByIdAsc();

    List<Product> findByOwneremail(String owneremail);

}
