package com.example.speechtotext.Controller;

import com.example.speechtotext.Service.STTService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class STTController{
    private final STTService sttService;

    //현위치를 넘겨주기 위해 가져온다.
    @GetMapping("/speech/{current}")
    public String SpeechToText(@PathVariable String current, Model model) throws IOException, InterruptedException {
        //sttService에서 STT함수 구현
        String result = sttService.SpeechToText();
        //result에 stt의 결과값을 가져온다. 만약 null이면 다시 검색하도록 설정
        //결과값이 나오면 현위치 정보와 stt값을 넘겨준다.
        if (result == null) {
            model.addAttribute("url","/speech/"+current);
            model.addAttribute("message","다시 검색해주세요!");
        }
        model.addAttribute("current", current);
        model.addAttribute("stt",result);
        return "SearchDestination.html";
    }



}

