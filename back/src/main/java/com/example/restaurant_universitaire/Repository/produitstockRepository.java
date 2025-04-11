package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.categorie;

@Repository
public interface produitstockRepository extends JpaRepository<ProduitStock, Long> {

    ProduitStock findByNomProd(String nomProd);

    boolean existsByNomProd(String nomProd);
List<ProduitStock> findByCategorie(categorie categorie);
}
