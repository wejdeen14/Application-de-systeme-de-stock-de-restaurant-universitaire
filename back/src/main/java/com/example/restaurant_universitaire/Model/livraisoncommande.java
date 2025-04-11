package com.example.restaurant_universitaire.Model;

import java.sql.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;


import lombok.NoArgsConstructor;
@Data 
@Entity 
@AllArgsConstructor 
@NoArgsConstructor 
@Table(name="liv_commande")
public class livraisoncommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLiv;
    private Date date_liv;
    private  Double prix_totale;
    @JsonIgnore
    @ManyToMany (mappedBy="livraisoncommande")
    private Set <detailslivraison> detailsliv;
@JsonIgnore


@OneToOne(mappedBy = "livraisoncommande")
private bondecommande bondecommande;

  @ManyToOne 
  @JoinColumn(name="idFac")
  private facture facture ;


  @Override
  public int hashCode() {
      return idLiv != null ? idLiv.hashCode() : 0;
  }

  @Override
  public boolean equals(Object obj) {
      if (this == obj) return true;
      if (obj == null || getClass() != obj.getClass()) return false;
      livraisoncommande that = (livraisoncommande) obj;
      return idLiv != null ? idLiv.equals(that.idLiv) : that.idLiv == null;
  }
 
}
