package com.creditflow.creditflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.creditflow.creditflow.models.AccountRecord;

public interface AccountRecordRepository extends JpaRepository <AccountRecord, Long>{
    // list all account records of the user
    // not using
    List<AccountRecord> findByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM AccountRecord ar WHERE ar.id = :accountRecordId AND ar.userId = :userId")
    // Delete the account record of the provided accountRecordId and userId
    void deleteAccountRecordByAccountRecordIdAndUserId(@Param("accountRecordId") Long accountRecordId, 
                                                       @Param("userId") Long userId);
}
