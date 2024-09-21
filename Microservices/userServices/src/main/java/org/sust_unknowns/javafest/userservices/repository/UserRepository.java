package org.sust_unknowns.javafest.userservices.repository;

import org.sust_unknowns.javafest.userservices.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

    // Custom query method to check if a user exists by email
    boolean existsByEmail(String email);

    // Custom query method to find a user by email
    User findByEmail(String email);

    List<User> findAllByRole(String role);

    // User getProfilesByUserId(String userId);
}
