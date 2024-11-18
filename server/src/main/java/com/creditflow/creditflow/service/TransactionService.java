package com.creditflow.creditflow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.creditflow.creditflow.dto.Dashboard.Dashboard;
import com.creditflow.creditflow.dto.Dashboard.DashboardAmounts;
import com.creditflow.creditflow.dto.Transaction.ReturnTransaction;
import com.creditflow.creditflow.dto.Transaction.TransactionWithClientName;
import com.creditflow.creditflow.models.Transaction;
import com.creditflow.creditflow.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Long addTransaction(Transaction transaction) {
        transaction.setCreatedAt(LocalDateTime.now());
        return transactionRepository.save(transaction).getId();
    }

    public List<ReturnTransaction> getTransactionsByAccountRecord(Long accountRecordId) {
        List<Transaction> transactions = transactionRepository.findByAccountRecordId(accountRecordId);
        return transactions.stream()
                .map(transaction -> new ReturnTransaction(transaction.getId(), transaction.getAccountRecordId(), transaction.getAmount(), transaction.getCreatedAt(), transaction.getTransactionType()))
                .collect(Collectors.toList());
    }

    public Dashboard getDashboard(Long userId,int page, int size){
        DashboardAmounts amounts = transactionRepository.getTodaysTrasactionAmountAndTotalBalance(userId);
        Pageable pageable = PageRequest.of(page, size);
        Page<TransactionWithClientName> result = transactionRepository.getRecentTransactionsWithClientNames(userId, pageable);
        return new Dashboard(amounts.getTodaysTotalTransaction(), amounts.getBalance(), result.getContent());
    }

}   
