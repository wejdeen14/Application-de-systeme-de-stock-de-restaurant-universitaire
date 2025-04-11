package com.example.restaurant_universitaire.Model;

import java.sql.Date; // Importer la classe Date de java.sql

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
@Entity
@Table(name="listeqte")
@AllArgsConstructor
@NoArgsConstructor
public class listqte {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_qte;

    private Date dateExpiration;
    private Double quantite;

   @ManyToOne
  @JoinColumn(name = "id_prod")
  private ProduitStock produit;
}
