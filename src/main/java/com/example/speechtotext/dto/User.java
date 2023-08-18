package com.example.speechtotext.dto;

import com.example.speechtotext.entity.UserDB;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
    //손님의 정보
    String phone;
    String password;
    //전화번호의 경우 로그인 제가 아직 로그인 구현을 하지 않아서 주석으로 설정,,
    String currentX;
    String currentY;
    String destinationX;
    String destinationY;

    public static User toDTO(UserDB userDB) {
        User user = new User();
        user.setPhone(userDB.getUserName());
        user.setCurrentX(userDB.getCurrentX());
        user.setCurrentY(user.getCurrentY());
        user.setDestinationX(user.getDestinationX());
        user.setDestinationY(user.getDestinationY());
        return user;
    }
}