package com.example.restaurant_universitaire.DTO;

import lombok.Data;

@Data
public class produitDTO {
    private Long id_prod;
    private String nomProd;
    private Double qte;
    private String unite;
    private Double prixUnitaire;
    private String categorie;
    private String date_peremption;

}
