package com.creditflow.creditflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditflow.creditflow.dto.AccountRecord.AccountRecordRequest;
import com.creditflow.creditflow.dto.AccountRecord.ReturnAccountRecord;
import com.creditflow.creditflow.service.AccountRecordService;

@RestController
@RequestMapping("/accountrecords")
public class AccountRecordController {

    @Autowired
    private AccountRecordService accountRecordService;

    @PostMapping("/")
    public ResponseEntity<Long> createAccountRecord(@RequestBody AccountRecordRequest req){
        Long recordId = accountRecordService.createAccountRecord(req.getUserId(), req.getClientName());
        return new ResponseEntity<>(recordId,HttpStatus.CREATED);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<ReturnAccountRecord>> getAccountRecordsByUserId(@PathVariable Long userId) {
        List<ReturnAccountRecord> accountRecordsList = accountRecordService.getAccountRecordsByUserId(userId);
        return new ResponseEntity<>(accountRecordsList,HttpStatus.OK);
    }
    
}
