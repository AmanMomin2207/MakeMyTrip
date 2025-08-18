package com.makemytrip.makemytrip.Services;

import com.makemytrip.makemytrip.models.Users;
import com.makemytrip.makemytrip.models.Users.Booking;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private  EmailTemplateService emailTemplateService;


    public void sendEmail (String to , String Subject , String bookingId , String date , double total){
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dates = LocalDate.parse(date, formatter);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

//            String htmlContent = "<h2>Your booking is confirmed ✅</h2>"
//                    + "<p><b>Booking ID:</b> " + bookingId + "</p>"
//                    + "<p><b>Date:</b> " + dates + "</p>"
//                    + "<p><b>Total Price:</b> ₹ " + total + "</p>"
//                    + "<hr>"
//                    + "<h3>Cancellation Policy:</h3>"
//                    + "<ul>"
//                    + "<li>Now: ₹ " + total + "</li>"
//                    + "<li>" + dates.plusDays(1) +" : ₹ " + total / 2 + "</li>"
//                    + "<li>" + dates.plusDays(2) +" : ₹ " + 0 + "</li>"
//                    + "</ul>";

            helper.setTo(to);
            helper.setSubject(Subject);
            helper.setText(emailTemplateService.buildBookingEmail(bookingId , date, total), true); // 'true' means HTML

            byte[] pdfBytes = PdfTicketGenerator.generateTicket(bookingId , date , total );

            helper.addAttachment("E-Ticket.pdf", new ByteArrayDataSource(pdfBytes, "application/pdf"));

            mailSender.send(message);
        }
        catch (Exception e){
            log.error("Exception while sendEmail ", e);
        }
    }


}
