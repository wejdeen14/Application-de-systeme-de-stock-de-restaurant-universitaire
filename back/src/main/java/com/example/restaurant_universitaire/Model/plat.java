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
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Plat")
public class plat {
  @Id 
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_plat;
    private String principale;
    private String entre;
    @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "idMenu")
  private menu menu;


   @OneToMany(mappedBy = "plat", cascade = CascadeType.ALL)
    private List<dessert> desserts;


    @OneToMany(mappedBy = "plat", cascade = CascadeType.ALL)
    private List<supplimentaire> supplimentaires;


}
