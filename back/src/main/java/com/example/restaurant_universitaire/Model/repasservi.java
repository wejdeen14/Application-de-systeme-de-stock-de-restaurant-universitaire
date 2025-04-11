package com.example.restaurant_universitaire.Model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "repasservi")
public class repasservi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idrepas;
    private Date dateServi;
    private int nbEtudient;
    private int nbAgent;
    private int nbouvrier;
    private int repaservi;

    

    @OneToOne
    @JoinColumn(name = "idcout") 
    private coutrepas coutrepas;



}
