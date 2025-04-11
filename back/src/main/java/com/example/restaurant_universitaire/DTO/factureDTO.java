package com.example.restaurant_universitaire.DTO;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class factureDTO {
    private Long idFac;
    private Date dateFac;
    private Double prixFac;
    private Double prixTVA;
    private List<livcmdDTO> liv;

}
