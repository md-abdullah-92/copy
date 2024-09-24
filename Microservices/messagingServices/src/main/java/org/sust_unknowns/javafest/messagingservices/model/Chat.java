package org.sust_unknowns.javafest.messagingservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "chats")
public class Chat {
    @Id
    private String id;
    private String user1Id; // Reference to the first user (e.g., a farmer)
    private String user2Id; // Reference to the second user (e.g., a buyer)
    private List<Message> messages; // List of message IDs associated with this chat
    // Getters and Setters
}
