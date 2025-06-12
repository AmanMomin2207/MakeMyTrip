package com.makemytrip.makemytrip.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")  // mongo DB Document
public class Users {
    @Id                                                     //Spring data
    private String _id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String phoneNumber;

    public void setfirstname(String firstname){
        this.firstname = firstname;
    }

    public String getfirstname(){
        return firstname;
    }

    public void setlastname(String secondname){
        this.lastname = secondname;
    }

    public String getlastname(){
        return lastname;
    }

    public void setphoneNumber(String number){
        this.phoneNumber = number;
    }

    public String getphoneNumber(){
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole(){
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
