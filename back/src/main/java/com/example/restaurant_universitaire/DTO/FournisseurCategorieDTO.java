package com.example.restaurant_universitaire.DTO;

import java.util.List;

import com.example.restaurant_universitaire.Model.fournisseur;

import lombok.Data;

@Data
public class FournisseurCategorieDTO {
    private fournisseur fournisseur;
   
        private List<String> categories;
}