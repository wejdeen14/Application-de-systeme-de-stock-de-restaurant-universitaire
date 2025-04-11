package com.example.restaurant_universitaire.DTO;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class bondeDTO {

  private Long id_cmd;
  private Date date_cmd;
  private Long id_liv ;
  private List<detailInfo> detailcomds;
}
