package com.creditflow.creditflow.dto.Transaction;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TotalTransactionOfAccountRecord {
    private Long accountRecordId;
    private String accountRecordName;
    private BigDecimal totalAmount;
}
