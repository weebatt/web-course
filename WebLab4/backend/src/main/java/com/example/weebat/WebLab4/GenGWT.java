package com.example.weebat.WebLab4;

import java.security.SecureRandom;
import java.util.Base64;

public class GenGWT {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] key = new byte[32];
        random.nextBytes(key);
        String secret = Base64.getEncoder().encodeToString(key);
        System.out.println("Generated JWT Secret: " + secret);
    }
}
