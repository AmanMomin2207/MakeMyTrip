package com.makemytrip.makemytrip.Services;

import com.makemytrip.makemytrip.models.Users;
import com.makemytrip.makemytrip.models.Users.Booking;
import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.models.Hotel;
import com.makemytrip.makemytrip.repositories.UserRepository;
import com.makemytrip.makemytrip.repositories.FlightRepository;
import com.makemytrip.makemytrip.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.makemytrip.makemytrip.Services.BookingEmailService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

@Service
public class BookingService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefundPolicyService refundPolicyService;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BookingEmailService bookingEmailService;

    public Booking bookFlight(String userId, String fligthId, int seats, double price) {
        Optional<Users> userOptional = userRepository.findById(userId);
        Optional<Flight> flightOptional = flightRepository.findById(fligthId);

        if (userOptional.isPresent() && flightOptional.isPresent()) {
            Users user = userOptional.get();
            Flight flight = flightOptional.get();

            if (flight.getAvailableSeats() >= seats) {
                flight.setAvailableSeats(flight.getAvailableSeats() - seats);
                flightRepository.save(flight);

                Booking booking = new Booking();
                booking.setType("Flight");
                booking.setBookingId(fligthId);
                booking.setDate(LocalDate.now().toString());
                booking.setQuantity(seats);
                booking.setTotalPrice(price);
                booking.setDelayMinutes(flight.getDelayMinutes());
                booking.setDelayReason(flight.getDelayReason());
                booking.setStatus_Flight(flight.getStatus());
                user.getBookings().add(booking);
                userRepository.save(user);

                bookingEmailService.sendEmail(
                        user.getEmail(),
                        "Your booking is confirmed.",
                        booking.getBookingId(),
                        booking.getDate(),
                        booking.getTotalPrice()
                );

                return booking;
            }
            else{
                throw new RuntimeException("Not enough seats available");
            }
        }

        throw new RuntimeException("User or flight not found");
    }

    public Booking bookHotel(String userId, String hotelId, int rooms, double price) {
        Optional<Users> userOptional = userRepository.findById(userId);
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelId);

        if (userOptional.isPresent() && hotelOptional.isPresent()) {
            Users user = userOptional.get();
            Hotel hotel = hotelOptional.get();

            if (hotel.getAvailableRooms() >= rooms) {
                hotel.setAvailableRooms(hotel.getAvailableRooms() - rooms); 
                hotelRepository.save(hotel);

                Booking booking = new Booking();
                booking.setType("Hotel");
                booking.setBookingId(hotelId);
                booking.setDate(LocalDate.now().toString());
                booking.setQuantity(rooms);
                booking.setTotalPrice(price);
                user.getBookings().add(booking);
                userRepository.save(user);

                bookingEmailService.sendEmail(
                        user.getEmail(),
                        "Your booking is confirmed.",
                        booking.getBookingId(),
                        booking.getDate(),
                        booking.getTotalPrice()
                );

                return booking;
            }
            else{
                throw new RuntimeException("Not enough rooms available");
            }
        }
        throw new RuntimeException("User or flight not found");
    }

    public Users cancelBooking(String userId , String bookingId, String reason) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for(Booking booking : user.getBookings()){
            if (booking.getBookingId().equals(bookingId)) {
                // already canceled?
                if (booking.getStatus().equals("CANCELED")) {
                    return user;  // return existing user object
                }

                double refundAmount = refundPolicyService.calculateRefund(
                        booking.getDate(),
                        LocalDateTime.now(),
                        booking.getTotalPrice()
                );

                booking.setStatus("CANCELED");

                Booking.Refund refund = new Booking.Refund();
                refund.setStatus("PROCESSING");
                refund.setAmount(refundAmount);
                refund.setReason(reason);

                booking.setRefund(refund);
            }
        }

        return userRepository.save(user); // save updated user with booking changes

    }
}
