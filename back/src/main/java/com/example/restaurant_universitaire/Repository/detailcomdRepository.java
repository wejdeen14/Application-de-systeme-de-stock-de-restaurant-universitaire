package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.bondecommande;
import com.example.restaurant_universitaire.Model.detailcomd;

import jakarta.transaction.Transactional;
@Transactional
public interface detailcomdRepository extends JpaRepository<detailcomd, Long> {

    List<detailcomd> findByBondecommande(bondecommande bondecommande);




   
   
   
   
}
