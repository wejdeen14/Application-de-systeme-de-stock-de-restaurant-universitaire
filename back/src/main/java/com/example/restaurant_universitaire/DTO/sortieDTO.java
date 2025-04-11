package com.example.restaurant_universitaire.DTO;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data

public class sortieDTO {
  private Long id_sortie;
  private Date date_sortie;
private Double montantsortie;

  private List<detailSortieDTO> sortie;

}
