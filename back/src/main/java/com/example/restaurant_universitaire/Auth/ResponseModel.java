package com.example.restaurant_universitaire.Auth;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class ResponseModel {
    private String message;
    private int code;
    private HttpStatus status;
    private String username;
    private String password;

    private String identite;
    private String nom;
    private String prenom;
    private String genre;
    private Long tel;
    private String imgUser;
    private String role;
}
