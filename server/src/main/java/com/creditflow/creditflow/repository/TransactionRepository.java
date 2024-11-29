package com.creditflow.creditflow.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.creditflow.creditflow.dto.Dashboard.DashboardAmounts;
import com.creditflow.creditflow.dto.Transaction.TotalTransactionOfAccountRecord;
import com.creditflow.creditflow.dto.Transaction.TransactionWithClientName;
import com.creditflow.creditflow.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // list all transactions of account record id and user id
    // filters: pagination
    Page<Transaction> findByAccountRecordIdAndUserId(Long accountRecordId, Long userId, Pageable pageable);

    // get todays transaction amount and total balance for a user
    @Query("SELECT new com.creditflow.creditflow.dto.Dashboard.DashboardAmounts("
            + "COALESCE(SUM(CASE WHEN t.transactionType = 'CREDIT' THEN t.amount "
            + "WHEN t.transactionType = 'DEBIT' THEN -t.amount ELSE 0 END), 0), "
            + "COALESCE(SUM(CASE WHEN t.transactionType = 'CREDIT' AND FUNCTION('DATE', t.createdAt) = CURRENT_DATE THEN t.amount "
            + "WHEN t.transactionType = 'DEBIT' AND FUNCTION('DATE', t.createdAt) = CURRENT_DATE THEN -t.amount ELSE 0 END), 0)) "
            + "FROM Transaction t "
            + "WHERE t.user.id = :userId")
    DashboardAmounts getTodaysTrasactionAmountAndTotalBalance(@Param("userId") Long userId);

    // get all transactions for user
    // filters: pagination
    @Query("SELECT new com.creditflow.creditflow.dto.Transaction.TransactionWithClientName("
            + "t.id, ar.id, ar.clientName, t.user.id, t.amount, t.createdAt, t.transactionType) "
            + "FROM Transaction t "
            + "JOIN AccountRecord ar ON t.accountRecord.id = ar.id "
            + "WHERE t.user.id = :userId "
            + "ORDER BY t.createdAt DESC")
    Page<TransactionWithClientName> getAllTransactionsWithClientNames(@Param("userId") Long userId, Pageable pageable);

    // get all account records and their total balance for a userId
    // filters: pagination
    @Query("SELECT new com.creditflow.creditflow.dto.Transaction.TotalTransactionOfAccountRecord("
    + "ar.id AS account_record_id, ar.clientName, "
    + "SUM(CASE WHEN t.transactionType = 'DEBIT' THEN -t.amount ELSE t.amount END) AS totalAmount "
    + ") "
    + "FROM AccountRecord ar "
    + "LEFT JOIN ar.transactions t ON ar.id = t.accountRecord.id AND t.user.id = ar.userId "
    + "WHERE ar.userId = :userId "
    + "GROUP BY ar.id, ar.clientName "
    + "ORDER BY ar.id DESC")
    Page<TotalTransactionOfAccountRecord> getTotalTransactionForAccountRecordsByUserId(
            @Param("userId") Long userId, Pageable pageable);
/*
-- corresponding psql query
SELECT ar.id AS account_record_id, 
       ar.client_name,
       SUM(CASE 
               WHEN t.transaction_type = 'DEBIT' THEN -t.amount 
               WHEN t.transaction_type = 'CREDIT' THEN t.amount 
               ELSE 0 
           END) AS total
FROM account_record ar
LEFT JOIN Transaction t ON ar.id = t.account_record_id AND t.user_id = ar.user_id
WHERE ar.user_id = 1
GROUP BY ar.id, ar.client_name;
*/

}
