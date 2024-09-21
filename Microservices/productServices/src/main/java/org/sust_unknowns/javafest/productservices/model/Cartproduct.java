package org.sust_unknowns.javafest.productservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("cartproduct")
public class Cartproduct {
    @Id
    private String id;
    private String productname;
    private String image;
    private String description;
    private String category;
    private String price;
    private String quantity;
    private String rating;
    private String email;
}
