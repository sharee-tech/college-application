/*
Represents the structure and properties of a user entity within the application, mapping
its attributes to the database schema and encapsulating user-related data.
 */
package org.example.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Optional;

@Entity
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })




public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotBlank
    @Size(min=6, max=64)
    @Column(name = "username")
    private String username;

    @NotBlank
    @Size(max = 64)
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min=6, max=64)
    @Column(name = "password")
    private String password;

    // Constructors, getters, setters

    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getters and setters for the fields

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}