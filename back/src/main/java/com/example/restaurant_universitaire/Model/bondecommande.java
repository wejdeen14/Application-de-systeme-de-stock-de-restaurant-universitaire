package com.example.restaurant_universitaire.Model;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Bondecommande")
public class bondecommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCmd;
    private Date date_cmd;

    @ManyToMany(mappedBy = "bondecommande")
    private Set<detailcomd> details;

    @OneToOne
  @JoinColumn(name = "id_liv")
private livraisoncommande livraisoncommande;

    @Override
    public int hashCode() {
        return idCmd != null ? idCmd.hashCode() : 0;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        bondecommande that = (bondecommande) obj;
        return idCmd != null ? idCmd.equals(that.idCmd) : that.idCmd == null;
    }
}
