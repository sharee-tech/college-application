/*
Facilitates data access and management for colleges within the database, providing
methods for CRUD operations and college-related database interactions.
 */
package org.example.repositories;

import org.example.models.College;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollegeRepository extends JpaRepository<College, Integer> {

    Optional<College> findByUserIdAndCollegeId(int userId, int collegeId);


    List<College> findByUserId(Integer userId);

    public default void addCollegeToFavorite(String username, String collegeID, String customNote) {
        // Database query to insert into SavedColleges table
        // INSERT INTO SavedColleges (CollegeID, CustomNote, UserID) VALUES (collegeID, customNote, userID)
    }

    // Get news articles for a college
    public default List<String> getCollegeNews(String collegeID) {
        // Database query to fetch news articles for the given collegeID from a relevant table
        // SELECT NewsTitle FROM CollegeNews WHERE CollegeID = collegeID
        // Return a list of news titles or articles
        return null; // Placeholder, implement actual logic
    }

    // Filter colleges based on criteria
    public default List<College> filterColleges(String location, String degreeType, String major,
                                                int studentBodySize, double tuition) {
        // Database query to filter colleges based on the given criteria
        // SELECT * FROM Colleges WHERE Location = location AND DegreeType = degreeType AND ...
        // Return a list of College objects
        return null; // Placeholder, implement actual logic
    }

    // Compare favorite colleges for a user
    public default List<College> compareFavoriteColleges(String username) {
        // Database query to fetch user's favorite colleges and details to compare
        // SELECT c.* FROM SavedColleges s INNER JOIN Colleges c ON s.CollegeID = c.CollegeID
        // WHERE s.UserID = userID
        // Return a list of College objects
        return null; // Placeholder, implement actual logic
    }
}
