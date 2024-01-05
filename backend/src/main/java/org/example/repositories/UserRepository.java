/*
Handles data access and management for users within the database, offering
methods for CRUD operations and user-related database interactions.
 */
package org.example.repositories;
import org.example.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Double> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);


//    // Method to save a new user to the database
//    public default void saveUser(User user) {
//        // Database query to insert user details into the User table
//        // INSERT INTO User (Username, Password, Email) VALUES (user.getUsername(), user.getPassword(), user.getEmail())
//    }

//    // Method to find a user by username
//    public default User findByUsername(String username) {
//        User user = null;
//        Connection connection = null;
//        PreparedStatement statement = null;
//        ResultSet resultSet = null;
//
//        try {
//            // Database query to retrieve user details by username
//            // SELECT * FROM User WHERE Username = username
//            // Execute the query, retrieve user details from ResultSet, and populate the 'user' object
//        } //catch (SQLException e) {
//        // e.printStackTrace();
//        // Handle exceptions or log errors
//        //}
//        finally {
//            // Close connections, statements, and result sets if used
//        }
//
//        return user;
//    }

    // Other methods for user-related database operations can be added here
}