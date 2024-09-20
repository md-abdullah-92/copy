package org.sust_unknowns.javafest.messagingservices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.sust_unknowns.javafest.messagingservices.model.Chat;
import org.sust_unknowns.javafest.messagingservices.model.Message;
import org.sust_unknowns.javafest.messagingservices.model.User;
import org.sust_unknowns.javafest.messagingservices.repository.ChatRepository;
import org.sust_unknowns.javafest.messagingservices.repository.MessageRepository;
import org.sust_unknowns.javafest.messagingservices.repository.UserRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    // Method to get all chats for a user
    public List<Chat> getChatsForUser(String userId) {
        return chatRepository.findByUser1IdOrUser2Id(userId, userId);
    }

    // Method to get all messages for a chat
    public List<Message> getMessagesForChat(String chatId) {
        return messageRepository.findByChatId(chatId);
    }

    // Method to save a chat after checking for existence
    public Chat createOrGetExistingChat(String user1Id, String user2Id) {
        // Check if the chat already exists
        Optional<Chat> existingChat = chatRepository
                .findByUser1IdAndUser2Id(user1Id, user2Id)
                .or(() -> chatRepository.findByUser1IdAndUser2Id(user2Id, user1Id));

        if (existingChat.isPresent()) {
            return existingChat.get(); // Return the existing chat
        } else {
            // Create a new chat
            Chat newChat = new Chat();
            newChat.setUser1Id(user1Id);
            newChat.setUser2Id(user2Id);
            newChat.setMessages(List.of()); // Initialize with an empty message list

            Chat savedChat = chatRepository.save(newChat); // Save the new chat

            // Update the users' chat lists
            updateUserChats(user1Id, savedChat.getId());
            updateUserChats(user2Id, savedChat.getId());

            return savedChat; // Return the newly created chat
        }
    }

    public Message addMessageToChat(String chatId, Message message) {
        // Fetch the chat from the repository using the provided chatId
        Optional<Chat> chatOptional = chatRepository.findById(chatId);

        // Check if the chat exists
        if (chatOptional.isPresent()) {
            Chat chat = chatOptional.get();

            // Set the chat ID for the message to associate it correctly
            message.setChatId(chatId);

            String time = java.time.LocalDateTime.now().toString();
            message.setTime(time); // Set the current time for the message

            // Save the message to the message repository
            Message savedMessage = messageRepository.save(message);

            // Add the newly saved message to the chat's list of messages
            List<Message> messages = chat.getMessages();
            if (messages == null) {
                messages = new ArrayList<>();
            }
            messages.add(savedMessage);
            chat.setMessages(messages); // Set updated list of message objects

            // Save the updated chat back to the chat repository
            chatRepository.save(chat);

            // Return the saved message object
            return savedMessage;
        }

        // If chat is not found, throw an exception
        throw new IllegalArgumentException("Chat not found with id: " + chatId);
    }

    // Method to update the user's chat list
    private void updateUserChats(String userId, String chatId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getChatIds().contains(chatId)) {
                user.getChatIds().add(chatId); // Add chat ID to user's chat list
                System.out.println("User chat list updated: " + user.getChatIds());

                userRepository.save(user); // Save the updated user
            }
        }
    }

    // Method to get all chatids for a user from chat repository and return as a
    // list of chat . user1Id or user2Id
    public List<Chat> getChatIdsForUser(String userId) {
        List<Chat> chats = chatRepository.findByUser1IdOrUser2Id(userId, userId);
        return chats;
    }
}
