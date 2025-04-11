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
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "supp")
public class supplimentaire {
     @Id 
   @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idSupp;
private String nomSupp;


     @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "id_plat")
  private plat plat;
    
}
