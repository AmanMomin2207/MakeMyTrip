package com.makemytrip.makemytrip.Services;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class RefundPolicyService {

    public double calculateRefund(String bookingDate, LocalDateTime cancelDate, double amount) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate booking = LocalDate.parse(bookingDate, formatter);

        long hoursDiff = Duration.between(cancelDate, booking.atStartOfDay()).toHours();

        if (hoursDiff <= 12) {
            return amount; // 100% refund
        }
        else if(hoursDiff <= 24) {
            return amount * 0.5; // 50% refund
        }
        else{
            return amount * 0.9;  // 90% refund
        }
    }

}
