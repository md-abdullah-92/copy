package org.sust_unknowns.javafest.productservices.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "productcomment")
public class Productcomment {
    private String id;
    private String date;
    private String comment;
    private String username;
    private String userid;
    private String productid;
    private String productname;
    private String useravatar;
}
