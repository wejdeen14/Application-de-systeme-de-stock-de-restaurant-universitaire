package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.bondecommande;
import com.example.restaurant_universitaire.Model.livraisoncommande;

@Repository
public interface bondcommandeRepository extends JpaRepository<bondecommande, Long> {

    bondecommande findByIdCmd(Long id);

    List<bondecommande> findByLivraisoncommandeIsNull();
    
}
