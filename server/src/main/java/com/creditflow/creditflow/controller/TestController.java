package com.creditflow.creditflow.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/")
    @SuppressWarnings("unused")
    ResponseEntity<Object> testApi() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "OK");
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

}
