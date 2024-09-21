package org.sust_unknowns.javafest.userservices.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("user")
public class User {
    @Id
    private String id;

    @Field(name = "name")
    private String name;

    @Field(name = "role")
    private String role;

    @Field(name = "email")
    private String email;

    @Field(name = "password")
    private String password;

    @Field(name = "code")
    private String code;

    @Field(name = "isVerified")
    private boolean isVerified;

    @Field(name = "avatar")
    private String avatar; // newly added

    @Field(name = "gender")
    private String gender;

    @Field(name = "phone")
    private String phone;

    @Field(name = "address")
    private String address;

    @Field(name = "upazila")
    private String upazila;

    @Field(name = "zila")
    private String zila;

    @Field(name = "division")
    private String division;

    @Field(name = "organization")
    private String organization;

    public String getAvatar() {
        return avatar;
    }

}
