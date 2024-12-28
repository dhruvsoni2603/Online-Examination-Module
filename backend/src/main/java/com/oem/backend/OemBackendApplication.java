package com.oem.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OemBackendApplication.class, args);
	}

}
