package org.sust_unknowns.javafest.userservices.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class codeGenarator {

    // Method to generate a random code
    public String generateCode() {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 4; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }

    // Method to hash a password
    public String hashPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    // Method to check if a password matches the hashed value
    public boolean checkPassword(String password, String hash) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, hash);
    }
}
