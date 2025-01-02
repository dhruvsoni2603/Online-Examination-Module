package com.oem.backend.controller;

import io.imagekit.sdk.ImageKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@PreAuthorize("hasRole('admin')")
@RequestMapping("/api/imagekit")
public class ImagekitAuthController {

    @Autowired
    private ImageKit imageKit;

    @GetMapping("/auth")
    public Map<String, String> getAuthenticationParameters() {
        long expirationTimestamp = System.currentTimeMillis() / 1000L + 3600; // 1 hour
        return imageKit.getAuthenticationParameters(null, expirationTimestamp);
    }
}
