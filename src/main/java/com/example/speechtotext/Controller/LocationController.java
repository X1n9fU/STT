package com.example.speechtotext.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class LocationController {
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
    public String BothPosition(@RequestParam String current, @RequestParam String destination, Model model){
        model.addAttribute("current", current);
        model.addAttribute("destination", destination);
        return "CallTaxi.html";
    }

    @GetMapping("/write/{current}")
    public String WriteSearchLocation(@PathVariable String current, Model model){
        model.addAttribute("current", current);
        return "write.html";
    }
}
