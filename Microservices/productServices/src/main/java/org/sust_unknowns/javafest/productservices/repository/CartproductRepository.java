package org.sust_unknowns.javafest.productservices.repository;

import org.sust_unknowns.javafest.productservices.model.Cartproduct;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// Interface for Profile repository extending MongoRepository
public interface CartproductRepository extends MongoRepository<Cartproduct, String> {
    // Custom query method to find all profiles by user ID

    List<Cartproduct> findByEmail(String email);

    // Custom query method to delete by product id and email
    @Transactional
    @Query(value = "{'id': ?0, 'email': ?1}", delete = true)
    int deleteByIdAndEmail(String id, String email);

}
