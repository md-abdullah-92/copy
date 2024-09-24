package org.sust_unknowns.javafest.messagingservices.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
@Document(collection = "messages")
public class Message {
    private String id;
    private String chatId; // Reference to the chat this message belongs to
    private String senderId; // Reference to the user who sent the message
    private String receiverId; // Reference to the user who will receive the message
    private String text;
    private String time;
    // Getters and Setters
}
