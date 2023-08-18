package com.example.speechtotext.repository;

import com.example.speechtotext.entity.TaxiDriverEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiDriverRepository extends JpaRepository<TaxiDriverEntity, Long> {
    TaxiDriverEntity findByPhone(String phone);
}
