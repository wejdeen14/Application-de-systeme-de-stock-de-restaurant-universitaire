package com.example.restaurant_universitaire.Model;

import java.sql.Date;
import java.util.Set;

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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Bonde_sortie")
public class bondeSortie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sortie;
    private Date dateSortie;

    @ManyToOne
    @JoinColumn(name = "id_coutrepas")
    private coutrepas coutrepas;

    @ManyToMany(mappedBy = "bondeSortie")
    private Set<detailsortie> sortie;
}
