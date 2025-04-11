package com.example.restaurant_universitaire.DTO;

import java.sql.Date;

import lombok.Data;

 @Data
public class livcmdDTO {
    private Long idLiv ;
    private Date date_liv ;
    private Double prix_totale ;
    private String nomFor ;
    private String mail_for;
    private String tel_for ;
  
}
