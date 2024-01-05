/*
Handles data access and management for users within the database, offering
methods for CRUD operations and user-related database interactions.
 */
package org.example.repositories;

import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteTimesRepository {
    //database connections

    // Method to increment favorite count for a college
    public default void incrementFavoriteCount(String collegeID) {
        // Database query to increment the favorite count for a college in the FavColleges table
        // For example:
        // UPDATE FavColleges SET FavoriteTimes = FavoriteTimes + 1 WHERE CollegeID = collegeID
    }

    // Method to decrement favorite count for a college
    public default void decrementFavoriteCount(String collegeID) {
        // Database query to decrement the favorite count for a college in the FavColleges table
        // For example:
        // UPDATE FavColleges SET FavoriteTimes = FavoriteTimes - 1 WHERE CollegeID = collegeID
    }

    // Method to get favorite count for a college
    public default int getFavoriteCount(String collegeID) {
        int favoriteCount = 0;
        // Database query to retrieve the favorite count for a college from the FavColleges table
        // For example:
        // SELECT FavoriteTimes FROM FavColleges WHERE CollegeID = collegeID
        // Execute the query and retrieve the favorite count value into 'favoriteCount' variable
        return favoriteCount;
    }

    // Other methods for favorite count related database operations can be added here
}
