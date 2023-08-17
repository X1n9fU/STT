package com.example.speechtotext.entity;

import com.example.speechtotext.dto.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
public class UserDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String userName;

    @Column
    private String token;

    @Column
    private String currentX;

    @Column
    private String currentY;
    @Column
    private String destinationX;
    @Column
    private String destinationY;

    public static UserDB toEntity(User user){
        UserDB userDB = new UserDB();
        userDB.setUserName(user.getPhone());
        userDB.setCurrentX(user.getCurrentX());
        userDB.setCurrentY(user.getCurrentY());
        userDB.setDestinationX(user.getDestinationX());
        userDB.setDestinationY(user.getDestinationY());
        return userDB;
    }
}
