package com.Library_management.MyLibrary.repository;

import com.Library_management.MyLibrary.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
