package com.example.restaurant_universitaire.Auth;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginModel {
    private String mail;
    private String mot_de_passe;
}