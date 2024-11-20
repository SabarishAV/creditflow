package com.creditflow.creditflow.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccountRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    private String clientName;

    @OneToMany(mappedBy = "accountRecord")
    private Set<Transaction> transactions;

    public AccountRecord returnAccountRecord() {
        AccountRecord accountRecord = new AccountRecord();
        accountRecord.id = this.id;
        accountRecord.userId = this.userId;
        accountRecord.clientName = this.clientName;
        return accountRecord;
    }

}
