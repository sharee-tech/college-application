/*
Orchestrates college-specific operations, serving as a bridge between controllers
and data access layers while handling business logic and external API interactions.
 */
package org.example.services;


import org.example.models.College;
import org.example.repositories.CollegeRepository;

import java.util.List;

public class CollegeService {
    private CollegeRepository collegeRepository;

    public CollegeService(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    // Add a college to the favorites list for a user
    public void addCollegeToFavorite(String username, String collegeID, String customNote) {
        collegeRepository.addCollegeToFavorite(username, collegeID, customNote);
    }

    // Pull up news articles for a college
    public List<String> getCollegeNews(String collegeID) {
        return collegeRepository.getCollegeNews(collegeID);
    }

    // Fetch colleges based on filters
    public List<College> filterCollegesByCriteria(String location, String degreeType, String major,
                                                  int studentBodySize, double tuition) {
        return collegeRepository.filterColleges(location, degreeType, major, studentBodySize, tuition);
    }

    // Compare colleges from saved favorites
    public List<College> compareFavoriteColleges(String username) {
        return collegeRepository.compareFavoriteColleges(username);
    }

    // Other college-related functionalities can be added here
}