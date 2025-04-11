package com.example.restaurant_universitaire.DTO;

import java.util.List;

import lombok.Data;

@Data
public class platDTO {
    private Long id_plat;
    private String principale;
    private String entre;
  
    private List<dessertDTO> desserts;
    private List<suppDTO>  supplimentaires ;
}
