package com.example.weebat.WebLab4;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class TestJWT {
    public static void main(String[] args) {
        String secret = "jIxEuTluuRsMQEInw1gCXyUsQzyAU1WXPy1Fkp/b2LQ=";

        String token = Jwts.builder()
                .setSubject("testUser")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        System.out.println("Generated Token: " + token);
    }
}