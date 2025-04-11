package com.example.restaurant_universitaire.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.restaurant_universitaire.Model.*;

@Repository
public interface platrepository extends  JpaRepository<plat,Long>{

    List<plat> findByMenu(menu menu);

    

    
}
