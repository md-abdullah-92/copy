package org.sust_unknowns.javafest.userservices.model;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RequestUser {
    @Field(name = "name")
    private String name;
    @Field(name = "role")
    private String role;
    @Field(name = "email")
    private String email;
    @Field(name = "password")
    private String password;
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
    @Field(name = "bio")

    private String bio;
    @Field(name = "avatar")
    private String avatar;

}