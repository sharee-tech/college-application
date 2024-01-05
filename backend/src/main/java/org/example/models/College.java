/*
Handles data access and management for users within the database, offering
methods for CRUD operations and user-related database interactions.
 */
package org.example.models;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="colleges")
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "userId")
    private int userId;

    @Column(name = "collegeId")
    private int collegeId;

    @Column(name = "notes")
    @Size(min=1,max=100, message = "Please enter a description 1 to 100 chars long")
    private String notes;

    @Column(name = "appStatus")
    private int appStatus;

    public College() {

    }

    public College(int userId, int collegeId, String notes, int appStatus) {
        this.userId = userId;
        this.collegeId = collegeId;
        this.notes = notes;
        this.appStatus = appStatus;
    }

    public int getId() {
        return id;
    }

    public int getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(int collegeId) {
        this.collegeId = collegeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserid(int userId) {
        this.userId = userId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getAppStatus() {
        return appStatus;
    }

    public void setAppStatus(int appStatus) {
        this.appStatus = appStatus;
    }

    @Override
    public String toString() {
        return "College{" +
                "id=" + id +
                ", collegeId=" + collegeId +
                ", userId=" + userId +
                ", notes='" + notes + '\'' +
                ", appStatus=" + appStatus +
                '}';
    }

}