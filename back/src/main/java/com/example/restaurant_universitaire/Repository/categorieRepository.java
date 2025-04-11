package com.example.restaurant_universitaire.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.categorie;

@Repository
public interface categorieRepository extends JpaRepository<categorie, Long> {

    categorie findByNomCategorie(String nomCategorie);


}
