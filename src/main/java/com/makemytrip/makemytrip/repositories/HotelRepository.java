package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface HotelRepository extends MongoRepository<Hotel,String>{

    // Case-insensitive "contains" on the location string
    List<Hotel> findByLocationContainingIgnoreCase(String location);

    // Common helpers:
    List<Hotel> findByPricePerNightLessThanEqual(double maxPrice);
    List<Hotel> findByAvailableRoomsGreaterThan(int minRooms);
    
} 
