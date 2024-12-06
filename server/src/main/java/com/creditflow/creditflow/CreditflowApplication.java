package com.creditflow.creditflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class CreditflowApplication {
	public static void main(String[] args) {

		// Dotenv dotenv = Dotenv.load();

		System.setProperty("DB_URL", System.getenv("DB_URL"));
		System.setProperty("DB_USERNAME", System.getenv("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", System.getenv("DB_PASSWORD"));
		// System.setProperty("DB_URL", dotenv.get("DB_URL"));
		// System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		// System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        SpringApplication.run(CreditflowApplication.class, args);
    }

}
