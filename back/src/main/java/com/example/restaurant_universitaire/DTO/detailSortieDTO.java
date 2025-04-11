package com.example.restaurant_universitaire.DTO;

import lombok.Data;

@Data
public class detailSortieDTO {
    private Long id_detailSortie;
    private Double qte;
    private String nomProd;
    private String nom_categorie;
    private String motif;
    private String unite;
    
}
