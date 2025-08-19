package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users") // mongo DB Document
public class Users {
    @Id // Spring data
    private String _id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String phoneNumber;

    private List<Booking> bookings = new ArrayList<>();

    public List<Booking> getBookings() {
        return bookings;
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getfirstname() {
        return firstname;
    }

    public void setlastname(String secondname) {
        this.lastname = secondname;
    }

    public String getlastname() {
        return lastname;
    }

    public void setphoneNumber(String number) {
        this.phoneNumber = number;
    }

    public String getphoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static class Booking {
        private String type;
        private String bookingId;
        private String date;
        private int quantity;
        private double totalPrice;
        private String status = "NOT_INITIATED"; // NOT_INITIATED, PROCESSING, COMPLETED
        private Refund refund;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Refund getRefund() {
            return refund;
        }

        public void setRefund(Refund refund) {
            this.refund = refund;
        }



        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getBookingId() {
            return bookingId;
        }

        public void setBookingId(String bookingId) {
            this.bookingId = bookingId;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(double totalPrice) {
            this.totalPrice = totalPrice;
        }

        public static class Refund {
            private String status = "NOT_INITIATED"; // NOT_INITIATED, PROCESSING, COMPLETED
            private double amount;
            private String reason;

            // Getters and Setters

            public String getStatus() {
                return status;
            }

            public double getAmount() {
                return amount;
            }

            public String getReason() {
                return reason;
            }

            public void setStatus(String status) {
                this.status = status;
            }

            public void setAmount(double amount) {
                this.amount = amount;
            }

            public void setReason(String reason) {
                this.reason = reason;
            }
        }
    }
}
