package com.creditflow.creditflow.dto.Transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.creditflow.creditflow.models.Types.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReturnTransaction {
    private Long id;
    private Long accountRecordId;
    private Long userId;
    private BigDecimal amount;
    private LocalDateTime createdAt;
    private TransactionType transactionType;
}
