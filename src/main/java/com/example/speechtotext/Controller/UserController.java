package com.example.speechtotext.Controller;


import com.example.speechtotext.Service.TestCoolsms;
import com.example.speechtotext.entity.UserDB;
import com.example.speechtotext.repository.UserRepository;
import com.google.api.Http;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Random;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @RequestMapping("/")
    public String Main() {
        return "main";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/message")
    @Transactional
    public String testMessage(UserDB user, String phoneNumber, HttpServletRequest request) {
        Random rand = new Random();
        String numStr = "";
        for(int i = 0; i< 6; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr += ran;
        }

        TestCoolsms.certifiedPhoneNumber(phoneNumber, numStr);

        if(userRepository.findByUserName(phoneNumber) != null) {
            userRepository.deleteByUserName(phoneNumber);
        }

        user.setUserName(phoneNumber);
        user.setToken(numStr);

        userRepository.save(user);

        String referer = request.getHeader("Referer");
        return "redirect:" + referer;
    }

    @PostMapping("/messageCertificated")
    public String messageAuth(String messageNumber,HttpServletRequest request) {
        UserDB user = userRepository.findByToken(messageNumber);
        if( user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user.getUserName());
            return "home";
        }
        else {
            return "main";
        }
    }
}
