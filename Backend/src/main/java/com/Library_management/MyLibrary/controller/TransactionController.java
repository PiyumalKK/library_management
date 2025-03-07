package com.Library_management.MyLibrary.controller;

import com.Library_management.MyLibrary.model.Transaction;
import com.Library_management.MyLibrary.model.Book;
import com.Library_management.MyLibrary.model.User;
import com.Library_management.MyLibrary.repository.TransactionRepository;
import com.Library_management.MyLibrary.repository.BookRepository;
import com.Library_management.MyLibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Issue a book to a user
    @PostMapping("/issue")
    public Transaction issueBook(@RequestParam Long bookId, @RequestParam Long userId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found!"));
        if (!book.isAvailable()) {
            throw new RuntimeException("Book is already issued!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        book.setAvailable(false);
        bookRepository.save(book);

        Transaction transaction = new Transaction();
        transaction.setBook(book);
        transaction.setUser(user);
        transaction.setIssueDate(LocalDate.now());
        return transactionRepository.save(transaction);
    }

    // Return a book
    @PostMapping("/return")
    public Transaction returnBook(@RequestParam Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found!"));

        Book book = transaction.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        transaction.setReturnDate(LocalDate.now());
        return transactionRepository.save(transaction);
    }
}
