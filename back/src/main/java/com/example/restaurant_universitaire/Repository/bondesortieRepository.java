package com.example.restaurant_universitaire.Repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.bondeSortie;
import com.example.restaurant_universitaire.Model.coutrepas;

public interface bondesortieRepository extends JpaRepository<bondeSortie, Long> {

    List<bondeSortie> findByCoutrepas(coutrepas coutrepas);

    List<bondeSortie> findByDateSortie(Date dateSortie);

}
