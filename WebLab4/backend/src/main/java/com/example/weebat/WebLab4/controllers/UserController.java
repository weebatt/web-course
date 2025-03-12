package com.example.weebat.WebLab4.controllers;

import com.example.weebat.WebLab4.dto.AuthRequest;
import com.example.weebat.WebLab4.dto.AuthResponse;
import com.example.weebat.WebLab4.dto.RegisterRequest;
import com.example.weebat.WebLab4.services.UserService;
import com.example.weebat.WebLab4.utils.JwtUtils;
import com.example.weebat.WebLab4.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService authService;
    private final JwtUtils jwtUtils;

    public UserController(UserService authService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = authService.authenticate(request);
        String token = jwtUtils.generateToken(user.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
