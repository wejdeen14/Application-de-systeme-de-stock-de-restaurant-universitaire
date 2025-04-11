package com.example.restaurant_universitaire.Model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

 @Data 
@Entity 
@AllArgsConstructor 
@NoArgsConstructor 
@Table(name="facture")
public class facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFac;
    private  Date dateFac;
    private Double prixFac;
    private Double prixTVA;
    
   
    @JsonIgnore
    @OneToMany(mappedBy="facture", cascade = CascadeType.ALL)
    private List<livraisoncommande> livraisoncommande ;

  
}
