package com.example.restaurant_universitaire.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.menu;

public interface menuRepository  extends JpaRepository<menu,Long>{
    
}
