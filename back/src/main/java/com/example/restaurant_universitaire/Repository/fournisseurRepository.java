package com.example.restaurant_universitaire.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.fournisseur;

@Repository
public interface fournisseurRepository extends JpaRepository<fournisseur, Long> {
    
}
