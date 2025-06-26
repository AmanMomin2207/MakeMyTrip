package com.makemytrip.makemytrip.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.models.Hotel;

// import com.makemytrip.makemytrip.models.Users;
// import com.makemytrip.makemytrip.repositories.UserRepository;
import com.makemytrip.makemytrip.repositories.FlightRepository;
import com.makemytrip.makemytrip.repositories.HotelRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RootController {

    // @Autowired
    // private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping("/")
    public String home() {return " Its running on port 8080";}

    // @GetMapping("*/users")
    // public ResponseEntity<List<Users>> getallUsers() {
    //     List<Users> users = userRepository.findAll();
    //     return ResponseEntity.ok(users); 
    // }

    @GetMapping("*/flight")
    public ResponseEntity<List<Flight>> getallflights() {
        List<Flight> flights = flightRepository.findAll();
        return ResponseEntity.ok(flights); 
    }

    @GetMapping("*/hotel")
    public ResponseEntity<List<Hotel>> getallhotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return ResponseEntity.ok(hotels); 
    }
}
