package com.example.speechtotext.dto;

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
}
