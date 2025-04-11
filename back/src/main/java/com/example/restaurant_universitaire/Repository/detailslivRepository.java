package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.detailslivraison;
import com.example.restaurant_universitaire.Model.livraisoncommande;

public interface detailslivRepository extends JpaRepository<detailslivraison, Long> {

    List<detailslivraison> findByLivraisoncommande(livraisoncommande livraisoncommande);

    List<detailslivraison> findByProduitOrderByDatexp(ProduitStock produit);

}