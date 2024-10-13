package com.creditflow.creditflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditflow.creditflow.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{
    List<Transaction> findByAccountRecordId(Long accountRecordId);
}
