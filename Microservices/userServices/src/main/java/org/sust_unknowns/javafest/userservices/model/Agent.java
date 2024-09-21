package org.sust_unknowns.javafest.userservices.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "agents")
public class Agent {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String password;
    private String status;
    private boolean isVerified;
    // Add NID Number, NID Image, and singnature image
    private String nidNumber;
    private String nidImage;
    private String signatureImage;
    private String avatar;
    private String code;
    private String Gender;
    private String OTP;
}
