package com.example.speechtotext.Controller;

import com.example.speechtotext.entity.UserDB;
import com.example.speechtotext.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class LocationController {

    private final UserRepository userRepository;

    @GetMapping("/location")
    public String STTSearchLocation(){
        return "SearchLocation.html";
    }

    @GetMapping("/position/{detailAddr}")
    public String currentLocation(@PathVariable String detailAddr, Model model){
        model.addAttribute("current",detailAddr);
        return "index.html";
    }


    @GetMapping("/position")
    public String BothPosition(UserDB userDB, HttpServletRequest request, @RequestParam String current, @RequestParam String destination, Model model){
        model.addAttribute("current", current);
        model.addAttribute("destination", destination);

        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("user"));

        userDB = userRepository.findByUserName((String)session.getAttribute("user"));

        userDB.setCurrentX(userDB.getCurrentX());
        userDB.setCurrentY(userDB.getCurrentY());
        userDB.setDestinationX(userDB.getDestinationX());
        userDB.setDestinationY(userDB.getDestinationY());

        userRepository.save(userDB);
        return "CallTaxi.html";
    }

    @GetMapping("/write/{current}")
    public String WriteSearchLocation(@PathVariable String current, Model model){
        model.addAttribute("current", current);
        return "write.html";
    }
}
