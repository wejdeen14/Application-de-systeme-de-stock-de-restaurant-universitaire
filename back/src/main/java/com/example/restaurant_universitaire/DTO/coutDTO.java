package com.example.restaurant_universitaire.DTO;

import java.sql.Date;

import lombok.Data;

@Data
public class coutDTO {
    private Long idcout;
    private Date dateRepas;
    private Double coutrepas;
    private Double montantjour;
    private dtoUsercalcul user;

}
