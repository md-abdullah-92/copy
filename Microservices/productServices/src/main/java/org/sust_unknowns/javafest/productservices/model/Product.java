package org.sust_unknowns.javafest.productservices.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("product")
public class Product {
    private String id;
    private String productname;
    private String image;
    private String description;
    private String category;
    private String price;
    private String quantity;
    private String rating;
    private String totalsold;
    private String ownername;
    private String ownerid;
    private String owneremail;
    private String totalrating;
    private String ownerogranization;
    private String ownerupzila;
    private String ownerzila;
    private String ownerdivision;
    private String ownerphone;
}
