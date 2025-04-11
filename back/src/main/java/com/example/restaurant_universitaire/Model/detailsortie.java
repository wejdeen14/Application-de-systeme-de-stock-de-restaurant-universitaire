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
@Table(name = "detailSortie")
public class detailsortie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id_detailSortie;
  private Double qte;
  private String unite;
  private String motif;

  @ManyToOne
  @JoinColumn(name = "id_prod")
  private ProduitStock produit;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "id_sortie")
  private bondeSortie bondeSortie;

}
