/*
Handles incoming HTTP requests.
Defines endpoints and routes, interacts with services, and prepares responses.

 */
package org.example.controllers;

import org.example.models.College;
import org.example.repositories.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CollegeController {
    @Autowired
    CollegeRepository collegeRepository;

    //    Get all colleges given a specific userId
    @GetMapping("/colleges/{userId}")
    public ResponseEntity<List<College>> getCollegesByUserId(@PathVariable("userId") Integer userId) {
        List<College> colleges = collegeRepository.findByUserId(userId);

        if (colleges.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(colleges, HttpStatus.OK);
        }
    }

    //    Update a specific saved college by userId AND collegeId
    @PutMapping("/colleges/{userId}/{collegeId}")
    public ResponseEntity<College> updateCollege(@PathVariable("userId") Integer userId, @PathVariable("collegeId") Integer collegeId, @RequestBody College college) {
        Optional<College> collegeData = collegeRepository.findByUserIdAndCollegeId(userId, collegeId);

        if (collegeData.isPresent()) {
            College _college = collegeData.get();
            _college.setAppStatus(college.getAppStatus());
            _college.setNotes(college.getNotes());

            return new ResponseEntity<>(collegeRepository.save(_college), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //    Delete college from favorites list
    @DeleteMapping("/colleges/{userId}/{collegeId}")
    public ResponseEntity<HttpStatus> deleteCollege(@PathVariable("userId") Integer userId, @PathVariable("collegeId") Integer collegeId) {

//        Find specific row from a specific user and specific college
        Optional<College> collegeData = collegeRepository.findByUserIdAndCollegeId(userId, collegeId);

//        If a row exists, get the row id and set equal to id

        Integer id = null;
        if (collegeData.isPresent()) {
            College _college = collegeData.get();
            id = _college.getId();
        }

//        Use the JPA deleteById method to delete that specific id row
        try {
            collegeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //    Add a new college row to database (this will be for adding a favorite college for a specific user)
    @PostMapping("/colleges")
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        try {
            College _college = collegeRepository
                    .save(new College(college.getUserId(), college.getCollegeId(), college.getNotes(), college.getAppStatus()));
            return new ResponseEntity<>(_college, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    Delete all rows in saved colleges table - probably will not use
    @DeleteMapping("/colleges")
    public ResponseEntity<HttpStatus> deleteAllColleges() {
        try {
            collegeRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}