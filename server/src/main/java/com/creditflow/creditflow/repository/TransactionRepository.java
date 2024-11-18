package com.creditflow.creditflow.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.creditflow.creditflow.dto.Dashboard.DashboardAmounts;
import com.creditflow.creditflow.dto.Transaction.TransactionWithClientName;
import com.creditflow.creditflow.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccountRecordId(Long accountRecordId);

    // get todays transaction amount and total balance for a user
    @Query("SELECT new com.creditflow.creditflow.dto.Dashboard.DashboardAmounts("
    + "COALESCE(SUM(CASE WHEN t.transactionType = 'CREDIT' THEN t.amount "
    + "WHEN t.transactionType = 'DEBIT' THEN -t.amount ELSE 0 END), 0), "
    + "COALESCE(SUM(CASE WHEN t.transactionType = 'CREDIT' AND FUNCTION('DATE', t.createdAt) = CURRENT_DATE THEN t.amount "
    + "WHEN t.transactionType = 'DEBIT' AND FUNCTION('DATE', t.createdAt) = CURRENT_DATE THEN -t.amount ELSE 0 END), 0)) "
    + "FROM Transaction t "
    + "WHERE t.user.id = :userId")
DashboardAmounts getTodaysTrasactionAmountAndTotalBalance(@Param("userId") Long userId);


    @Query("SELECT new com.creditflow.creditflow.dto.Transaction.TransactionWithClientName("
            + "t.id, ar.id, ar.clientName, t.user.id, t.amount, t.createdAt, t.transactionType) "
            + "FROM Transaction t "
            + "JOIN AccountRecord ar ON t.accountRecord.id = ar.id "
            + "WHERE t.user.id = :userId "
            + "ORDER BY t.createdAt DESC")
    Page<TransactionWithClientName> getRecentTransactionsWithClientNames(@Param("userId") Long userId, Pageable pageable);
}