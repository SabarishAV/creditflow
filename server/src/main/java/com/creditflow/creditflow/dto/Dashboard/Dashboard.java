package com.creditflow.creditflow.dto.Dashboard;

import java.math.BigDecimal;
import java.util.List;

import com.creditflow.creditflow.dto.Transaction.TransactionWithClientName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dashboard {
    private BigDecimal todaysTotalTransaction;
    private BigDecimal balance;
    private List<TransactionWithClientName> transactions;
}
