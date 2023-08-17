package com.example.speechtotext.Service;

import com.example.speechtotext.dto.User;
import com.example.speechtotext.entity.UserDB;
import com.example.speechtotext.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RestTemplateService {

    private final UserRepository userRepository;

    //기사님에게 현위치, 목적지 정보를 넘겨준다.
    public User getPhone(User user, String phone){

        URI uri = UriComponentsBuilder.
                fromHttpUrl("http://localhost:8888")
                .path("/api/taxi/phone/{phone}")
                .encode()
                .build()
                .expand(phone)
                .toUri();

        System.out.println(uri);

        User req = new User();
        req.setPhone(user.getPhone());
        req.setCurrentX(user.getCurrentX());
        req.setCurrentY(user.getCurrentY());
        req.setDestinationX(user.getDestinationX());
        req.setDestinationY(user.getDestinationY());

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<User> response = restTemplate.postForEntity(uri,req, User.class);

        System.out.println(response.getStatusCode());
        System.out.println(response.getHeaders());
        System.out.println(response.getBody());

        return response.getBody();
    }

//    public User update(User user,String phone){
//        User req = new User();
//        req.setPhone(phone);
//        req.setCurrentX(user.getCurrentX());
//        req.setCurrentY(user.getCurrentY());
//        req.setDestinationX(user.getDestinationX());
//        req.setDestinationY(user.getDestinationY());
//        UserDB userDB = UserDB.toEntity(req);
//
//        userRepository.save(userDB);
//
//        return findByPhone(req.getPhone());
//    }

//    public User findByPhone(String phone){
//        Optional<UserDB> optional = userRepository.findByUserName(phone);
//        if (optional.isPresent()){
//            UserDB userDB = optional.get();
//            User user = User.toDTO(userDB);
//        }
//    }
}
