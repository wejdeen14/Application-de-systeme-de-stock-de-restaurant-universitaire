package com.example.restaurant_universitaire.DTO;

import java.util.Date;
import java.util.List;

import com.example.restaurant_universitaire.Model.typeMenu;

import lombok.Data;
@Data
public class menuDTO {
    private Long idMenu;
     private typeMenu nomMenu;
        private Date dateCreation ;
        
private List<platDTO> plats;


    
}
