package org.sust_unknowns.javafest.userservices.service;

import org.sust_unknowns.javafest.userservices.model.User;
import org.sust_unknowns.javafest.userservices.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to create a new user
    public void createUser(User user) {
        userRepository.insert(user);
    }

    // Method to update an existing user
    public void updateUser(User user) {
        userRepository.save(user);
    }

    // Method to retrieve a user (not used, consider removing or implementing)
    public void getUser() {

    }

    // Method to retrieve all users
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public List<User> getAllUserByRole(String role) {
        return userRepository.findAllByRole(role);
    }

    // Method to delete a user (not used, consider removing or implementing)
    public void deleteUser() {
        // Implement deletion logic here
    }

    // Method to check if a user exists by ID
    public boolean checkUser(String email) {
        return userRepository.existsByEmail(email);
    }

    // Method to retrieve a user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Method to retrieve a user by ID
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

}
