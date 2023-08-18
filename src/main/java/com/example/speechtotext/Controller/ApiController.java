package com.example.speechtotext.Controller;

import com.example.speechtotext.Service.RestTemplateService;
import com.example.speechtotext.dto.Driver;
import com.example.speechtotext.dto.User;
import com.example.speechtotext.entity.TaxiDriverEntity;
import com.example.speechtotext.entity.UserDB;
import com.example.speechtotext.repository.TaxiDriverRepository;
import com.example.speechtotext.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
public class ApiController {

    private final UserRepository userRepository;
    private final RestTemplateService restTemplateService;
    private final TaxiDriverRepository taxiDriverRepository;

    //손님 앱에서 기사님 앱으로 손님 정보 전달
    @PostMapping("/taxi/call")
    public User getPhone(@RequestBody User userResponse, HttpServletRequest request){
//        System.out.println(userResponse);
        HttpSession session = request.getSession();
        String phone = (String) session.getAttribute("user");
        System.out.println(phone);

        UserDB userDB = userRepository.findByUserName((String)session.getAttribute("user"));

        userDB.setCurrentX(userResponse.getCurrentX());
        userDB.setCurrentY(userResponse.getCurrentY());
        userDB.setDestinationX(userResponse.getDestinationX());
        userDB.setDestinationY(userResponse.getDestinationY());


        userRepository.save(userDB);

//        System.out.println(phone); //
        return restTemplateService.getPhone(userResponse, phone);
        //post하는 과정에서 프론트에서 ajax 형식으로 보내주는 것이 필요함
        //내가 만든 html파일에서는 이 과정이 승낙되지 않음!
        //따라서 npm start로 프론트를 열고 send 해주자.
        //나중에 ajax형식으로 들어온다면 번호를 지우고 phone을 입력
    }

    private String driverPhone;

    //기사님 앱에서 현위치랑, 목적지를 받아옴
    @PostMapping("/api/taxi")
    public void post(@RequestBody Driver driver){
        driverPhone = driver.getPhone();
        log.info("client request: {}", driver);
    }

    @RequestMapping(value = "/driver", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Driver> get() {
        Driver driver = Driver.toDTO(taxiDriverRepository.findByPhone(driverPhone));
        log.info("client request: {}", driver);
        return ResponseEntity.ok(driver);
    }




}

//손닙 앱