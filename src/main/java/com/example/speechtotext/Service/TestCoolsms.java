package com.example.speechtotext.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class TestCoolsms {
    public static String certifiedPhoneNumber(String phoneNumber, String cerNum) {

        String api_key = "NCSBJYVOQYL1JV73";
        String api_secret = "YKN5U3NVSZAYPBJL3FIFFWUCOFOOAKMK";

        Message coolsms = new Message(api_key, api_secret);

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);
        params.put("from", "01091606380");
        params.put("type", "SMS");
        params.put("text", "휴대폰 인증 테스트 메세지 : 인증번호는" + "[" + cerNum + "]" + "입니다.");
        params.put("app_version", "test app 1.2");

        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }

        return cerNum;
    }
}
