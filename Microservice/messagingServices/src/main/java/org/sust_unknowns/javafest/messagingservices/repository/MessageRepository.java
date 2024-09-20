package org.sust_unknowns.javafest.messagingservices.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.sust_unknowns.javafest.messagingservices.model.Message;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatId(String chatId);
}
