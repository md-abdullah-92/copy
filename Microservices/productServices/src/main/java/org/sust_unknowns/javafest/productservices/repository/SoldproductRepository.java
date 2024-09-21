package org.sust_unknowns.javafest.productservices.repository;

import org.sust_unknowns.javafest.productservices.model.Soldproduct;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SoldproductRepository extends MongoRepository<Soldproduct, String> {
    Soldproduct findTopByOrderByIdDesc();

    Soldproduct findTopByOrderByIdAsc();

    List<Soldproduct> findBySelleremail(String selleremail);

    List<Soldproduct> findByBuyeremail(String buyeremail);

    List<Soldproduct> findByProductid(String productid);

}
