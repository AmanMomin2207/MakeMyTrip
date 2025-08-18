package com.makemytrip.makemytrip.Services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.ByteArrayOutputStream;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class PdfTicketGenerator {

    public static byte[] generateTicket(String bookingId, String date, double price) {
        try {

            // Colors
            BaseColor headerColor = new BaseColor(52, 152, 219); // blue
            BaseColor lightGray = new BaseColor(240, 240, 240);

            // Fonts
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.WHITE);
            Font subHeaderFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK);
            Font textFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.DARK_GRAY);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dates = LocalDate.parse(date, formatter);

            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);
            document.open();

            // Title Bar
            PdfPTable titleTable = new PdfPTable(1);
            titleTable.setWidthPercentage(100);
            PdfPCell titleCell = new PdfPCell(new Phrase("E-Ticket Confirmation", titleFont));
            titleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            titleCell.setBackgroundColor(headerColor);
            titleCell.setPadding(12f);
            titleCell.setBorder(Rectangle.NO_BORDER);
            titleTable.addCell(titleCell);
            document.add(titleTable);
            document.add(Chunk.NEWLINE);

            // Booking Info
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setSpacingBefore(10f);
            infoTable.setSpacingAfter(10f);
            infoTable.setWidths(new float[]{1f, 2f});

            infoTable.addCell(getLabelCell("Booking ID:", subHeaderFont));
            infoTable.addCell(getValueCell(bookingId, textFont));

            infoTable.addCell(getLabelCell("Date:", subHeaderFont));
            infoTable.addCell(getValueCell(dates.toString(), textFont));

            infoTable.addCell(getLabelCell("Total Price:", subHeaderFont));
            infoTable.addCell(getValueCell("₹ " + price, textFont));

            document.add(infoTable);

            // Divider
            LineSeparator ls = new LineSeparator();
            document.add(ls);
            document.add(Chunk.NEWLINE);

            // Cancellation Policy Title
            Paragraph cpHeader = new Paragraph("Cancellation Policy", subHeaderFont);
            cpHeader.setSpacingAfter(8f);
            document.add(cpHeader);

            // Policy Table
            PdfPTable policyTable = new PdfPTable(2);
            policyTable.setWidthPercentage(100);
            policyTable.setWidths(new float[]{2f, 1f});

            policyTable.addCell(getPolicyCell("Now", textFont, lightGray));
            policyTable.addCell(getPolicyCell("₹ " + price, textFont, lightGray));

            policyTable.addCell(getPolicyCell(dates.plusDays(1).toString(), textFont, BaseColor.WHITE));
            policyTable.addCell(getPolicyCell("₹ " + (price / 2), textFont, BaseColor.WHITE));

            policyTable.addCell(getPolicyCell(dates.plusDays(2).toString(), textFont, lightGray));
            policyTable.addCell(getPolicyCell("₹ 0", textFont, lightGray));

            document.add(policyTable);

//            document.add(new Paragraph("E-Ticket Confirmation", titleFont));
//            document.add(new Paragraph("Booking ID: " + bookingId));
//            document.add(new Paragraph("Date: " + dates));
//            document.add(new Paragraph("Total Price: ₹ " + price));
//            document.add(new Paragraph("Cancellation Policy:"));
//            document.add(new Paragraph(" - Now: ₹ "+ price + "\n - "+dates.plusDays(1)+ ": ₹" + price / 2 + "\n - "+dates.plusDays(2)+ ": ₹ 0"));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }

    private static PdfPCell getLabelCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        return cell;
    }

    private static PdfPCell getValueCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        return cell;
    }

    private static PdfPCell getPolicyCell(String text, Font font, BaseColor bgColor) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(bgColor);
        cell.setPadding(6f);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }
}

