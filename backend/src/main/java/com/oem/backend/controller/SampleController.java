package com.oem.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${frontend_url}")
public class SampleController {

        @PreAuthorize("hasRole('USER')")
        @GetMapping("/hello")
        public String hello() {
            return "Hello, World!";
        }

        @PreAuthorize("hasRole('ADMIN')")
        @GetMapping("/admin")
        public String admin() {
            return "Hello, Admin!";
        }
}
