package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.Services.TravelPackageService;
import com.makemytrip.makemytrip.dto.TravelPackageResponse;
import com.makemytrip.makemytrip.models.TravelPackage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/packages")
@CrossOrigin(origins = "*")
public class TravelPackageController {

    private final TravelPackageService travelPackageService;

    public TravelPackageController(TravelPackageService travelPackageService) {
        this.travelPackageService = travelPackageService;
    }

    // GET all packages
    @GetMapping
    public List<TravelPackageResponse> getAllPackages() {
        return travelPackageService.getAllPackages();
    }

    // GET package by ID (return full details, not just IDs)
    @GetMapping("/{id}")
    public ResponseEntity<TravelPackageResponse> getPackageById(@PathVariable String id) {
        return travelPackageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST new package (for prebuilt bundles)
    @PostMapping
    public TravelPackage createPackage(@RequestBody TravelPackage travelPackage) {
        return travelPackageService.createPackage(travelPackage);
    }

    // POST custom package
    @PostMapping("/custom")
    public TravelPackage createCustomPackage(@RequestBody TravelPackage travelPackage) {
        return travelPackageService.createCustomPackage(travelPackage);
    }

    @GetMapping("/custom")
    public List<TravelPackageResponse> getCustomPackages(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double budget
    ) {
        return travelPackageService.getCustomPackages(from, to, budget);
    }


}
