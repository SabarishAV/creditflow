package com.creditflow.creditflow.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditflow.creditflow.models.AccountRecord;
import com.creditflow.creditflow.models.Transaction;
import com.creditflow.creditflow.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction addTransaction(AccountRecord accountRecord, BigDecimal amount, String transactionType) {
        Transaction transaction = new Transaction();
        transaction.setAccountRecord(accountRecord);
        transaction.setAmount(amount);
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setTransactionType(transactionType);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByAccountRecord(AccountRecord accountRecord) {
        return transactionRepository.findByAccountRecord(accountRecord);
    }

}
