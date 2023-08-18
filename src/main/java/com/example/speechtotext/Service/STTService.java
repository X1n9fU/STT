package com.example.speechtotext.Service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

@Service
public class STTService {

    public String SpeechToText() throws IOException, InterruptedException {
        //파이썬 파일 실행
        Process process = Runtime.getRuntime().exec("python \\speechtotext\\src\\stt\\stt.py");

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), Charset.forName("EUC-KR")));
        String line;
        StringBuilder output = new StringBuilder();

        while ((line = reader.readLine()) != null) {
             output.append(line).append("\n");
        }

        int index=output.indexOf("\n");
        while(output.indexOf("\n") != output.length()-1){
            index=output.indexOf("\n");
            output.deleteCharAt(index);
        }
        //계속해서 입력받았던 output 에서 맨 마지막 번역만 가져오도록 함

        int exitCode = process.waitFor();

        if (exitCode == 0) {
            //System.out.println(index);
            //System.out.println(output.toString().substring(index, output.length()-1));
            return output.toString().substring(index,output.length());
        } else {
            return null;
        }
    }
}
