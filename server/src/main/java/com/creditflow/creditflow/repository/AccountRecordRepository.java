package com.creditflow.creditflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditflow.creditflow.models.AccountRecord;

public interface AccountRecordRepository extends JpaRepository <AccountRecord, Long>{
    List<AccountRecord> findByUserId(Long userId);
}
