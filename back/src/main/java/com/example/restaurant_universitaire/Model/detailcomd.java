package com.example.restaurant_universitaire.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "Detail_cmd")
public class detailcomd {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id_detail;
  private Double qte;
  private String unite;

  @ManyToOne
  @JoinColumn(name = "id_prod")
  private ProduitStock produit;
  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "id_cmd")
  private bondecommande bondecommande;

}
