package com.example.restaurant_universitaire.Repository;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.coutrepas;
import com.example.restaurant_universitaire.Model.repasservi;

@Repository
public interface repaserviRepository extends JpaRepository<repasservi, Long> {

    repasservi findByCoutrepas(coutrepas coutrepas);

    repasservi findByDateServi(Date dateServi);

    boolean existsByDateServi(Date dateServi);

}
