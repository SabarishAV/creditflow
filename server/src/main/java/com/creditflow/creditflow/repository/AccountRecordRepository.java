package com.creditflow.creditflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditflow.creditflow.models.AccountRecord;

public interface AccountRecordRepository extends JpaRepository <AccountRecord, Long>{
    // list all account records of the user
    // not using
    List<AccountRecord> findByUserId(Long userId);
}
