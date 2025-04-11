package com.example.restaurant_universitaire.DTO;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class livDTO {
  private Long id_liv;
  private Date date_liv;

  private Double prix_totale;
private Long idCmd;
private Long idFac;
  private List<livinfo> livDetail;

}
