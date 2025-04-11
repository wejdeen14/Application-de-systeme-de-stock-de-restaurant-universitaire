package com.example.restaurant_universitaire.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.user;

public interface userRepository extends JpaRepository<user, Long> {
    // user findByMail(String mail);
    Optional<user> findByMail(String mail);

   

}
