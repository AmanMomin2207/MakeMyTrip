package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.Flight;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<Flight,String> {

    List<Flight> findByFromAndTo(String from, String to);

    // Prefer this if user may type different casing (Mumbai vs mumbai)
    List<Flight> findByFromIgnoreCaseAndToIgnoreCase(String from, String to);

    // Optional helpers (useful for your /custom endpoint):
    List<Flight> findByFromIgnoreCase(String from);
    List<Flight> findByToIgnoreCase(String to);

    // If you want to filter on price as well (<= budget for flight portion)
    List<Flight> findByFromIgnoreCaseAndToIgnoreCaseAndPriceLessThanEqual(String from, String to, double maxPrice);
}
