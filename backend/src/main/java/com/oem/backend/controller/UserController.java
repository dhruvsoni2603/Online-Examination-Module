package com.oem.backend.controller;

import com.oem.backend.model.Users;
import com.oem.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users user) {
        String message = userService.registerUser(user);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return userService.verify(user);
    }
}
