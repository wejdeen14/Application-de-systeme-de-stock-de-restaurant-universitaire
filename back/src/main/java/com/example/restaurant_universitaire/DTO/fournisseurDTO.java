package com.example.restaurant_universitaire.DTO;

import java.util.List;

import lombok.Data;

@Data
public class fournisseurDTO {
    private Long id_for;
    private String nom_for;
    private String tel_for;
    private String mail_for;
    private List<String> categories;
}
