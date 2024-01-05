/*
Entry point of the Spring Boot application.
Configures the application, initializes Spring context, and starts the application.
*/
package org.example;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CollegeExplorerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollegeExplorerApplication.class, args);
    }
}