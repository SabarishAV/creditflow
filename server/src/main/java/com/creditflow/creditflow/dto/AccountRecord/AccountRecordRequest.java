package com.creditflow.creditflow.dto.AccountRecord;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountRecordRequest {
    private Long userId;
    private String clientName;
}
