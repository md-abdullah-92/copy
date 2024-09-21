package org.sust_unknowns.javafest.userservices.utils;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtils {

    // Method to generate JWT token
    public String generateToken(String id) {
        byte[] key = ("sust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_kn")
                .getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKeySpec = new SecretKeySpec(key, SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(new Date())
                .signWith(secretKeySpec, SignatureAlgorithm.HS256)
                .compact();
    }

    // Method to validate JWT token and retrieve user ID
    public String validateToken(String token) {
        byte[] key = "sust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_knownssust_kn"
                .getBytes();

        try {
            JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
            System.out.println(jwtParser.parseClaimsJws(token).getBody().getSubject());
            return jwtParser.parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
