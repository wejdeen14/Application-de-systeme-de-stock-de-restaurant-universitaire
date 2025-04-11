package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.bondeSortie;
import com.example.restaurant_universitaire.Model.detailsortie;

public interface detailsortieRepository extends JpaRepository<detailsortie, Long> {

    List<detailsortie> findByBondeSortie(bondeSortie bondeSortie);

}
