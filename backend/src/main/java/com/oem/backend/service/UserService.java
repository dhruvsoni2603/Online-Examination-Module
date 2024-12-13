package com.oem.backend.service;

import com.oem.backend.model.Users;
import com.oem.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo userRepo;

    private final AuthenticationManager authManager;

    private final JWTService jwtService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepo userRepo, AuthenticationManager authenticationManager, AuthenticationManager authManager, JWTService jwtService) {
        this.userRepo = userRepo;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    public String registerUser(Users user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered";
    }

    public String verify(Users user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {

            return jwtService.generateToken(user.getUsername());
        } else {
            return "User not authenticated";
        }
    }
}
