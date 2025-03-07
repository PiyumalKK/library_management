package com.Library_management.MyLibrary.repository;

import com.Library_management.MyLibrary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
