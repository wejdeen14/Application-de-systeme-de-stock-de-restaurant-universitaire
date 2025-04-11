package com.example.restaurant_universitaire.Model;

import java.sql.Date;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Detail_liv")
public class detailslivraison {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id_detailsliv;
  private double qte;
  private Double prix_unitaire;
  private String unite;
  private Date  datexp;
  
  @ManyToOne
  @JoinColumn(name = "id_liv")
  private livraisoncommande livraisoncommande;

  @ManyToOne
  @JoinColumn(name = "id_prod")
  private ProduitStock produit;


}
