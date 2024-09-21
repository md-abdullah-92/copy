package org.sust_unknowns.javafest.messagingservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.sust_unknowns.javafest.messagingservices.model.Chat;
import org.sust_unknowns.javafest.messagingservices.model.Message;
import org.sust_unknowns.javafest.messagingservices.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{chatId}/messages")
    public List<Message> getMessagesForChat(@PathVariable String chatId) {
        return chatService.getMessagesForChat(chatId);
    }

    @PostMapping
    public Chat createOrGetChat(@RequestParam String user1Id, @RequestParam String user2Id) {
        return chatService.createOrGetExistingChat(user1Id, user2Id);
    }
    // Add a message to a chat and also update the chat's message list

    @PostMapping("/{chatId}/messages")
    public Message addMessageToChat(@PathVariable String chatId, @RequestBody Message message) {
        System.out.println("Adding message to chat: " + message.getSenderId());
        Message savedMessage = chatService.addMessageToChat(chatId, message);

        // Notify all WebSocket clients of the new message
        messagingTemplate.convertAndSend("/topic/messages", savedMessage);

        return savedMessage;
    }

    // find all chatids for a user
    @GetMapping("/user/chatids")
    public List<Chat> getChatIdsForUser(@RequestParam String userId) {
        return chatService.getChatIdsForUser(userId);
    }

    //

}
