package org.sust_unknowns.javafest.messagingservices.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.sust_unknowns.javafest.messagingservices.model.User;

//import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be added here if needed
}
