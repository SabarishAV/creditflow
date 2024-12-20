package com.creditflow.creditflow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.creditflow.creditflow.dto.Dashboard.Dashboard;
import com.creditflow.creditflow.dto.Dashboard.DashboardAmounts;
import com.creditflow.creditflow.dto.Transaction.ReturnTransaction;
import com.creditflow.creditflow.dto.Transaction.TotalTransactionOfAccountRecord;
import com.creditflow.creditflow.dto.Transaction.TransactionWithClientName;
import com.creditflow.creditflow.models.Transaction;
import com.creditflow.creditflow.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // create transaction
    public Long addTransaction(Transaction transaction) {
        transaction.setCreatedAt(LocalDateTime.now());
        return transactionRepository.save(transaction).getId();
    }

    // retrun all transactions of an account record using account record id and user id
    public Page<ReturnTransaction> getAllTransactionsByAccountRecordAndUserId(Long accountRecordId, Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Transaction> transactions = transactionRepository.findByAccountRecordIdAndUserId(accountRecordId,userId,pageable);
        List<ReturnTransaction> returnTransactions = transactions.getContent().stream()
                .map(transaction -> new ReturnTransaction(
                        transaction.getId(), 
                        transaction.getAccountRecordId(), 
                        transaction.getUserId(), 
                        transaction.getAmount(), 
                        transaction.getCreatedAt(), 
                        transaction.getTransactionType()))
                .collect(Collectors.toList());
        return new PageImpl<>(returnTransactions, pageable, transactions.getTotalElements());
    }

    // get data for dashboard page
    public Dashboard getDashboard(Long userId,int page, int size){
        DashboardAmounts amounts = transactionRepository.getTodaysTrasactionAmountAndTotalBalance(userId);
        Pageable pageable = PageRequest.of(page, size);
        Page<TransactionWithClientName> result = transactionRepository.getAllTransactionsWithClientNames(userId, pageable);
        return new Dashboard(amounts.getTodaysTotalTransaction(), amounts.getBalance(), result.getContent());
    }

    // get data for balance page
    public Page<TotalTransactionOfAccountRecord> listAllAccountRecordsWithBalance(Long userId,int page,int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<TotalTransactionOfAccountRecord> accountRecords = transactionRepository.getTotalTransactionForAccountRecordsByUserId(userId,pageable);
        return accountRecords;
    }

    //get data for transactions page
    public Page<TransactionWithClientName> getTransactionsPage(Long userId, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<TransactionWithClientName> transactions = transactionRepository.getAllTransactionsWithClientNames(userId, pageable);
        return transactions;
    }
}   
