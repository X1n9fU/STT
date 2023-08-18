package com.example.speechtotext.dto;

import com.example.speechtotext.entity.TaxiDriverEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    //가져온 택시 기사님의 정보
    private String name;
    private String phone;
    private String CarNumber;
    private String CarType;

    public static Driver toDTO(TaxiDriverEntity taxiDriver) {
        Driver driver = new Driver();
        driver.setName(taxiDriver.getName());
        driver.setPhone(taxiDriver.getPhone());
        driver.setCarNumber(taxiDriver.getCarNumber());
        driver.setCarType(taxiDriver.getCarType());
        return driver;
    }
}
