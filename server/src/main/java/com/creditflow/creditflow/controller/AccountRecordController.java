package com.creditflow.creditflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditflow.creditflow.dto.AccountRecord.AccountRecordRequest;
import com.creditflow.creditflow.dto.AccountRecord.ReturnAccountRecord;
import com.creditflow.creditflow.service.AccountRecordService;
import com.creditflow.creditflow.service.UserService;

@RestController
@RequestMapping("/accountrecords")
public class AccountRecordController {

    @Autowired
    private AccountRecordService accountRecordService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    //create account record
    public ResponseEntity<?> createAccountRecord(@RequestBody AccountRecordRequest req) {
        System.out.println(req.getClientName());
        if (req.getUserId() == null || req.getClientName() == null) {
            return new ResponseEntity<>("All Filds are Mandatory", HttpStatus.BAD_REQUEST);
        }
        boolean userExists = userService.doesUserExists(req.getUserId());
    if (!userExists) {
        return new ResponseEntity<>("User ID does not exist", HttpStatus.BAD_REQUEST);
    }
        Long recordId = accountRecordService.createAccountRecord(req.getUserId(), req.getClientName());
        return new ResponseEntity<>(recordId, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    // get all account records by user id
    public ResponseEntity<List<ReturnAccountRecord>> getAccountRecordsByUserId(@PathVariable Long userId) throws Exception {
        List<ReturnAccountRecord> accountRecordsList = accountRecordService.getAccountRecordsByUserId(userId);
        return new ResponseEntity<>(accountRecordsList, HttpStatus.OK);
    }

    @GetMapping("/user/{accountRecordId}")
    // gets account record name for account record is
    public ResponseEntity<Optional<String>> getAccountRecordName(@PathVariable Long accountRecordId){
        Optional<String> accountRecordName = accountRecordService.getAccountRecordName(accountRecordId);
        if(accountRecordName.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(accountRecordName,HttpStatus.OK);
        }
    }

    @DeleteMapping("/{accountRecordId}/{userId}")
    // deletes all trasactions and the account record of the given account recod id
    public ResponseEntity<String> deleteTransactionsAndAccountRecord(@PathVariable Long accountRecordId, @PathVariable Long userId){
        accountRecordService.deleteTransactionsAndAccountRecord(accountRecordId, userId);
        return new ResponseEntity<>("Transactions and account record deleted successfully",HttpStatus.OK);
    }

}
