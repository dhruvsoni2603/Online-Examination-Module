package com.oem.backend.service;

import com.oem.backend.dto.UserLoginDTO;
import com.oem.backend.dto.UserRegisterDTO;
import com.oem.backend.model.User;
import com.oem.backend.repository.UserRepo;
import com.oem.backend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepo userRepository;

    private final AuthenticationManager authManager;

    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepo userRepository, AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public String registerUser(UserRegisterDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(new User(userDTO.getEmail(), userDTO.getPassword(), userDTO.getRole()));
        return "User registered";
    }

    public String verifyUser(UserLoginDTO userLoginDTO) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.getEmail(), userLoginDTO.getPassword())
        );

        if (authentication.isAuthenticated()) {
            User user = getUserByEmail(userLoginDTO.getEmail());
            return jwtUtil.generateToken(user.getEmail(), user.getRole());
        } else {
            return null;
        }
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
