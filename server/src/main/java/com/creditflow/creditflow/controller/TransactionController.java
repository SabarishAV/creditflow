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
import com.creditflow.creditflow.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/")
    public ResponseEntity<Long> createTransaction(@RequestBody Transaction transaction){
        Long transactionId = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(transactionId,HttpStatus.CREATED);
    }

    @GetMapping("/{accountRecordId}")
    public ResponseEntity<List<ReturnTransaction>> getTransactionsByAccountRecordId(@PathVariable Long accountRecordId){
        List<ReturnTransaction> transactions = transactionService.getTransactionsByAccountRecord(accountRecordId);
        return new ResponseEntity<>(transactions,HttpStatus.OK);
    }
    
}
