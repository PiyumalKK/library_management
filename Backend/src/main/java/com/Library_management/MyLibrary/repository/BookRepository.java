package com.Library_management.MyLibrary.repository;

import com.Library_management.MyLibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
