package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.TravelPackage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelPackageRepository extends MongoRepository<TravelPackage, String> {
}

