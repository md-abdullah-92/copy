package org.sust_unknowns.javafest.productservices.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("soldproduct")
public class Soldproduct {
    @Id
    private String id;
    private String productid;
    private String name;
    private String image;
    private String category;
    private String price;
    private String sellername;
    private String selleremail;
    private String buyername;
    private String buyeremail;
    private String soldprice;
    private String soldquantity;
    private String soldtime;
    private String soldby;
    private String soldto;
    private String deliverytime;
    private String deliverydate;
    private String code;
    private boolean isverified;
    private String deliverystatus;
    private String deliverytimeby;
    private String deliverytimeto;
    private String deliverybydate;
    private String deliverytodate;
    private String deliverybyaddress;
    private String deliverymethod;
    private String deliverytoaddress;
    private String deliverybyupzilaname;
    private String deliverytoupzilaname;
    private String deliverybyzilaname;
}
