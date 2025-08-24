package com.makemytrip.makemytrip.dto;

import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.models.Hotel;
import lombok.Data;

@Data
public class TravelPackageResponse {
    private String id;
    private String name;
    private Flight flight;
    private Hotel hotel;
    private int discountPercentage;
    private double finalPrice;
    private String type;
    private boolean groupDiscount;

    // ✅ No-args constructor
    public TravelPackageResponse() {}

    // ✅ All-args constructor
    public TravelPackageResponse(String id, String name, Flight flight, Hotel hotel,
                                 int discountPercentage, String type, boolean groupDiscount) {
        this.id = id;
        this.name = name;
        this.flight = flight;
        this.hotel = hotel;
        this.discountPercentage = discountPercentage;
        this.type = type;
        this.groupDiscount = groupDiscount;
    }
}
