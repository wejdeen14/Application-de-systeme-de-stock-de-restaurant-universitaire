package com.example.restaurant_universitaire.Model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "coutrepas")
public class coutrepas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcout")
    private Long idcout;

    private Date dateRepas;
    private Double coutrepas;
    private double montantjour;
    @JsonIgnore
    @OneToMany(mappedBy = "coutrepas", cascade = CascadeType.ALL)
    private List<bondeSortie> sortie;
    @OneToOne(mappedBy = "coutrepas")
    private repasservi repasservi;

}
