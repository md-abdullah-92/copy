package org.sust_unknowns.javafest.messagingservices.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.sust_unknowns.javafest.messagingservices.model.Chat;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findByUser1IdOrUser2Id(String user1Id, String user2Id);

    // Custom query method to find a chat between two users
    Optional<Chat> findByUser1IdAndUser2Id(String user1Id, String user2Id);
}
