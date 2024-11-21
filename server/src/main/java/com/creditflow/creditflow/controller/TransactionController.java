package com.creditflow.creditflow.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.creditflow.creditflow.dto.Dashboard.Dashboard;
import com.creditflow.creditflow.dto.Transaction.ReturnTransaction;
import com.creditflow.creditflow.dto.Transaction.TotalTransactionOfAccountRecord;
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
    // create transaction
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
    // get all trasactions by account record id and userid
    public ResponseEntity<Page<ReturnTransaction>> getTransactionsByAccountRecordId(@PathVariable Long accountRecordId,@RequestParam Long userId,@RequestParam int page,@RequestParam int size){
        Page<ReturnTransaction> transactions = transactionService.getAllTransactionsByAccountRecordAndUserId(accountRecordId,userId,page,size);
        return new ResponseEntity<>(transactions,HttpStatus.OK);
    }

    @GetMapping("/dashboard/{userId}")
    // get all details for dashboard page
    public ResponseEntity<Dashboard> getDashboard(@PathVariable Long userId){
        Dashboard dashboard = transactionService.getDashboard(userId,0,5);
        return new ResponseEntity<>(dashboard,HttpStatus.OK);
    }

    @GetMapping("/balance/{userId}/{page}/{size}")
    // get all details for balance page
    public ResponseEntity<Page<TotalTransactionOfAccountRecord>> getBalances(@PathVariable Long userId,@PathVariable int page, @PathVariable int size){
        Page<TotalTransactionOfAccountRecord> balances = transactionService.listAllAccountRecordsWithBalance(userId,page,size);
        return new ResponseEntity<>(balances,HttpStatus.OK);
    }
    
}