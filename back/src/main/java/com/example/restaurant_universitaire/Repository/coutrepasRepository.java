package com.example.restaurant_universitaire.Repository;

import java.sql.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_universitaire.Model.coutrepas;

@Repository
public interface coutrepasRepository extends JpaRepository<coutrepas, Long> {

    Optional<coutrepas> findByDateRepas(Date dateSortie);

    Optional<coutrepas> findFirstByDateRepasLessThanEqualOrderByDateRepasDesc(Date dateSysteme);

}
