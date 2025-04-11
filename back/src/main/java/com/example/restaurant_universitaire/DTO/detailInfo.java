package com.example.restaurant_universitaire.DTO;

import lombok.Data;

@Data
public class detailInfo {
        private Long id_detail;
        private Long id_prod;
        private String nomProd;
        private String categorie;
        private String fournisseur;
        private String mail_for;
       private String tel_for;

        private Double quantite;
        private String unite;
        
      
    
}
