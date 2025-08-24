package com.makemytrip.makemytrip.Services;

import com.makemytrip.makemytrip.dto.TravelPackageResponse;
import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.models.Hotel;
import com.makemytrip.makemytrip.models.TravelPackage;
import com.makemytrip.makemytrip.repositories.FlightRepository;
import com.makemytrip.makemytrip.repositories.HotelRepository;
import com.makemytrip.makemytrip.repositories.TravelPackageRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class TravelPackageService {
    private final TravelPackageRepository travelPackageRepository;
    private final FlightRepository flightRepository;
    private final HotelRepository hotelRepository;

    public TravelPackageService(TravelPackageRepository travelPackageRepository,
                                FlightRepository flightRepository,
                                HotelRepository hotelRepository) {
        this.travelPackageRepository = travelPackageRepository;
        this.flightRepository = flightRepository;
        this.hotelRepository = hotelRepository;
    }

    // Fetch all packages with flight + hotel lookup
    public List<TravelPackageResponse> getAllPackages() {
        return travelPackageRepository.findAll().stream().map(pkg -> {
            TravelPackageResponse response = new TravelPackageResponse();
            response.setId(pkg.getId());
            response.setName(pkg.getName());

            // Lookup flight & hotel
            Flight flight = flightRepository.findById(pkg.getFlightId()).orElse(null);
            Hotel hotel = hotelRepository.findById(pkg.getHotelId()).orElse(null);

            response.setFlight(flight);
            response.setHotel(hotel);
            response.setDiscountPercentage(pkg.getDiscountPercentage());

            // Calculate final price
            double basePrice = 0;
            if (flight != null) basePrice += flight.getPrice();
            if (hotel != null) basePrice += hotel.getPricePerNight();
            double finalPrice = basePrice - (basePrice * pkg.getDiscountPercentage() / 100);

            response.setFinalPrice(finalPrice);
            response.setType(pkg.getType());
            response.setGroupDiscount(pkg.isGroupDiscount());

            return response;
        }).collect(Collectors.toList());
    }

    public Optional<TravelPackageResponse> getPackageById(String id) {
        return travelPackageRepository.findById(id).map(pkg -> {
            Flight flight = flightRepository.findById(pkg.getFlightId()).orElse(null);
            Hotel hotel = hotelRepository.findById(pkg.getHotelId()).orElse(null);

            return new TravelPackageResponse(
                    pkg.getId(),
                    pkg.getName(),
                    flight,
                    hotel,
                    pkg.getDiscountPercentage(),
                    pkg.getType(),
                    pkg.isGroupDiscount()
            );
        });
    }

    // ✅ Create prebuilt package
    public TravelPackage createPackage(TravelPackage travelPackage) {
        return travelPackageRepository.save(travelPackage);
    }

    // ✅ Create custom package
    public TravelPackage createCustomPackage(TravelPackage travelPackage) {
        return travelPackageRepository.save(travelPackage);
    }

    public List<TravelPackageResponse> getCustomPackages(String from, String to, double budget) {
        // Step 1: Find matching flights
        List<Flight> matchingFlights = flightRepository.findByFromAndTo(from, to);

        // Step 2: Find all hotels (or filter by city later if you store hotel.location)
        List<Hotel> hotels = hotelRepository.findAll();

        List<TravelPackageResponse> results = new ArrayList<>();

        // Step 3: Build combinations
        for (Flight flight : matchingFlights) {
            for (Hotel hotel : hotels) {
                double totalPrice = flight.getPrice() + hotel.getPricePerNight();

                if (totalPrice <= budget) {
                    double finalPrice = totalPrice; // no discount by default
                    // 1. Create TravelPackage entity
                    TravelPackage pkg = new TravelPackage();
                    pkg.setName("Custom Package");
                    pkg.setFlightId(flight.getId());
                    pkg.setHotelId(hotel.getId());
                    pkg.setDiscountPercentage(0);
                    pkg.setType("custom");
                    pkg.setGroupDiscount(false);

                    // 2. Save to DB
                    TravelPackage savedPkg = travelPackageRepository.save(pkg);

                    // 3. Build Response with real ID
                    TravelPackageResponse response = new TravelPackageResponse(
                            savedPkg.getId(),   // MongoDB-generated ID
                            savedPkg.getName(),
                            flight,
                            hotel,
                            savedPkg.getDiscountPercentage(),
                            savedPkg.getType(),
                            savedPkg.isGroupDiscount()
                    );

                    finalPrice = totalPrice - (totalPrice * savedPkg.getDiscountPercentage() / 100);
                    response.setFinalPrice(finalPrice);

                    results.add(response);

                }
            }
        }

        return results;
    }

}
