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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Produit")
@Entity
@Data
public class ProduitStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_prod;
    private String nomProd;
    private Double qte;
    private String unite;
    private Date date_peremption;
    private Double prix_unitaire;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_categorie")
    private categorie categorie;

    @ManyToMany(mappedBy = "produit")
    private Set<detailcomd> details;

    @ManyToMany(mappedBy = "produit")
    private Set<detailsortie> sortie;

   

    /*
     * @OneToMany(cascade = CascadeType.ALL)
     * private List<listqte> listqte = new ArrayList<>();
     */

}
