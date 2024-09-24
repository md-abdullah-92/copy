package org.sust_unknowns.javafest.messagingservices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sust_unknowns.javafest.messagingservices.model.User;
import org.sust_unknowns.javafest.messagingservices.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        user.setChatIds(List.of()); // Initialize with an empty chat list
        System.out.println("User saved: " + user.getChatIds());
        return userRepository.save(user);
    }
}
