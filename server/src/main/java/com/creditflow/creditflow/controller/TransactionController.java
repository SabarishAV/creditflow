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

import com.creditflow.creditflow.dto.Transaction.ReturnTransaction;
import com.creditflow.creditflow.models.Transaction;
import com.creditflow.creditflow.service.AccountRecordService;
import com.creditflow.creditflow.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountRecordService accountRecordService;

    @PostMapping("/")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction){
        if(transaction.getAccountRecordId()==null || transaction.getAmount()==null || transaction.getTransactionType()==null){
            return new ResponseEntity<>("All fields are mandatory",HttpStatus.CREATED);
        }
        if(!accountRecordService.doesAccountRecordExists(transaction.getAccountRecordId())){
            return new ResponseEntity<>("Account Record with this id does not exist",HttpStatus.CREATED);
        }
        Long transactionId = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(transactionId,HttpStatus.CREATED);
    }

    @GetMapping("/{accountRecordId}")
    public ResponseEntity<List<ReturnTransaction>> getTransactionsByAccountRecordId(@PathVariable Long accountRecordId){
        List<ReturnTransaction> transactions = transactionService.getTransactionsByAccountRecord(accountRecordId);
        return new ResponseEntity<>(transactions,HttpStatus.OK);
    }
    
}
