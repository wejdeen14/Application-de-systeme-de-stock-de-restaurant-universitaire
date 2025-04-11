package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.restaurant_universitaire.Model.facture;
import com.example.restaurant_universitaire.Model.livraisoncommande;

public interface livcommandeRepository extends JpaRepository<livraisoncommande, Long> {

    List<livraisoncommande> findByFacture(facture facture);

    List<livraisoncommande> findByFactureIsNull();

    List<livraisoncommande> findByIdLiv(Long idLiv);

    
  

    

	


   
}
