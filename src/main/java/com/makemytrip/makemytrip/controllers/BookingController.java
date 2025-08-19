package com.makemytrip.makemytrip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.makemytrip.makemytrip.models.Users;
import com.makemytrip.makemytrip.Services.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/flight")
    public Users.Booking bookFlight(@RequestParam String userId , @RequestParam String flightId , @RequestParam int seats , @RequestParam double price ){
        return bookingService.bookFlight(userId, flightId, seats, price);
    }

    @PostMapping("/hotel")
    public Users.Booking bookHotel(@RequestParam String userId , @RequestParam String hotelId , @RequestParam int rooms , @RequestParam double price ){
        return bookingService.bookHotel(userId, hotelId, rooms, price);
    }

    @PostMapping("/cancel/{userId}/{bookingId}")
    public ResponseEntity<Users> cancelBooking(@PathVariable String userId,@PathVariable String bookingId,@RequestBody CancelRequest request
    ) {
        Users updatedUser = bookingService.cancelBooking(userId, bookingId, request.getReason());
        return ResponseEntity.ok(updatedUser);
    }

    // DTO for cancellation reason
    static class CancelRequest {
        private String reason;
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

}
