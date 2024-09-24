package org.sust_unknowns.javafest.userservices.repository;

import org.sust_unknowns.javafest.userservices.model.Agent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AgentRepository extends MongoRepository<Agent, String> {

    // Custom query method to check if a user exists by email
    boolean existsByEmail(String email);

    // Custom query method to find a user by email
    Agent findByEmail(String email);

    // User getProfilesByUserId(String userId);

}
