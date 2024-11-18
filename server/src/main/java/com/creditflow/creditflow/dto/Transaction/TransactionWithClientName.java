package com.creditflow.creditflow.dto.Transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.creditflow.creditflow.models.Types.TransactionType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionWithClientName {

    private Long id;
    private Long accountRecordId;
    private String accountRecordName;
    private Long userId;
    private BigDecimal amount;
    private LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    
}
