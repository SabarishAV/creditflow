package com.creditflow.creditflow.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditflow.creditflow.dto.AccountRecord.ReturnAccountRecord;
import com.creditflow.creditflow.models.AccountRecord;
import com.creditflow.creditflow.repository.AccountRecordRepository;

@Service
public class AccountRecordService {

    @Autowired
    private AccountRecordRepository accountRecordRepository;

    // create new account record
    public Long createAccountRecord(Long userId, String clientName) {
        AccountRecord accountRecord = new AccountRecord();
        accountRecord.setUserId(userId);
        accountRecord.setClientName(clientName);
        return accountRecordRepository.save(accountRecord).getId();
    }

    // get all account records for userId
    // not using
    public List<ReturnAccountRecord> getAccountRecordsByUserId(Long userId) throws Exception {
        List<AccountRecord> accountRecords = accountRecordRepository.findByUserId(userId);
        return accountRecords.stream()
                .map(record -> new ReturnAccountRecord(record.getId(), record.getUserId(), record.getClientName()))
                .collect(Collectors.toList());
    }

    // returns a boolean if account record exist
    public boolean doesAccountRecordExists(Long accountRecordId) {
        return accountRecordRepository.existsById(accountRecordId);
    }

    // returns account record name
    public Optional<String> getAccountRecordName(Long accountRecordId) {
        Optional<AccountRecord> optionalAccountRecord = accountRecordRepository.findById(accountRecordId);
        return optionalAccountRecord.map(AccountRecord::getClientName);
    }
}
