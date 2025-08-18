package com.makemytrip.makemytrip.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class EmailTemplateService {

    @Autowired
    private TemplateEngine templateEngine;

    public String buildBookingEmail(String bookingId, String date, double price) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate dates = LocalDate.parse(date, formatter);

        Context context = new Context();
        context.setVariable("bookingId", bookingId);
        context.setVariable("dates", dates);
        context.setVariable("date1" , dates.plusDays(1));
        context.setVariable("date2" , dates.plusDays(2));
        context.setVariable("price", price);
        context.setVariable("price2" , price / 2);
        context.setVariable("price3" , price / 4);
        return templateEngine.process("booking-confirmation.html", context);
    }
}
