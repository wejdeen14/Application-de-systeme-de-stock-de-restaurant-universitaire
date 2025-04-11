package com.example.restaurant_universitaire.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Categorie")
public class categorie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id_categorie;
  private String nomCategorie;
  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "id_for")
  private fournisseur fournisseur;

  @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ProduitStock> produits;

}
