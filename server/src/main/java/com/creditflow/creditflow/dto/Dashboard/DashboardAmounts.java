package com.creditflow.creditflow.dto.Dashboard;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardAmounts {
    private BigDecimal balance;
    private BigDecimal todaysTotalTransaction;
}
