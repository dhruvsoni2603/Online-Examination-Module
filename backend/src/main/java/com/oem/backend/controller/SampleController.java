package com.oem.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class SampleController {

        @GetMapping("/hello")
        @CrossOrigin(origins = "http://localhost:5174")
        public String hello() {
            return "Hello, World!";
        }
}
