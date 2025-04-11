package com.example.restaurant_universitaire.DTO;

import java.sql.Date;

import lombok.Data;

@Data
public class livinfo {
    private Long id_detailsliv;
    private Double qte;
    private Double prix_unitaire;
    private String unite;
    private String nomProd;
    private String nomCategorie;
    private String nom_for;
    private String tel_for;
    private String mail_for;
    private Date datexp;
    private Long idFac;

}