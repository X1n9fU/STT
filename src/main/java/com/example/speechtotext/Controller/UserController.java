package com.example.speechtotext.Controller;


import com.example.speechtotext.Service.TestCoolsms;
import com.example.speechtotext.dto.User;
import com.example.speechtotext.entity.UserDB;
import com.example.speechtotext.repository.UserRepository;
import com.google.api.Http;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Controller
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
public class UserController {

    private final UserRepository userRepository;

//    @RequestMapping("/")
//    public String Main() {
//        return "main";
//    }

//    @RequestMapping("/login")
//    public String login() {
//        return "login";
//    }

    @PostMapping("/message")
    @Transactional
    @ResponseBody
    public void testMessage(@RequestBody UserDB user, HttpServletRequest request) {
        String phoneNumber = user.getUserName();

        Random rand = new Random();
        StringBuilder numStr = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr.append(ran);
        }

         TestCoolsms.certifiedPhoneNumber(phoneNumber, numStr.toString());

        if (userRepository.findByUserName(phoneNumber) != null) {
            userRepository.deleteByUserName(phoneNumber);
        }

        user.setUserName(phoneNumber);
        user.setToken(numStr.toString());

        userRepository.save(user);

        HttpSession session = request.getSession();
        session.setAttribute("user", user.getUserName());

    }

    @RequestMapping("/messageCertificated")
    public Boolean messageAuth(@RequestBody User u, HttpServletRequest request) {
        String token = u.getPassword();
        UserDB user = userRepository.findByToken(token);

        if( user != null) {
            return true;
        }
        else {
            return false;
        }
    }
}
