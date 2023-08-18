package com.example.speechtotext.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="taxi_driver")
public class TaxiDriverEntity {
    @Id
    private String phone;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String CarNumber;

    @Column
    private String CarType;



}
