package com.example.restaurant_universitaire.Controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.CoutRepasDTO;
import com.example.restaurant_universitaire.DTO.coutDTO;
import com.example.restaurant_universitaire.DTO.dtoUsercalcul;
import com.example.restaurant_universitaire.Model.bondeSortie;
import com.example.restaurant_universitaire.Model.coutrepas;
import com.example.restaurant_universitaire.Model.detailsortie;
import com.example.restaurant_universitaire.Model.repasservi;
import com.example.restaurant_universitaire.Repository.bondesortieRepository;
import com.example.restaurant_universitaire.Repository.coutrepasRepository;
import com.example.restaurant_universitaire.Repository.detailsortieRepository;
import com.example.restaurant_universitaire.Repository.repaserviRepository;

@CrossOrigin("*")
@RequestMapping("/calcul")
@RestController
public class calculrepasController {
    @Autowired
    private coutrepasRepository coutrepasRepository;

    @Autowired
    private repaserviRepository repaserviRepository;

    @Autowired
    private bondesortieRepository bondesortieRepository;
    @Autowired
    private detailsortieRepository detailsortieRepository;

    @GetMapping()
    public List<coutDTO> listcalcul() {
        List<coutrepas> cout = coutrepasRepository.findAll();
        return cout.stream().map(this::mapToCout).collect(Collectors.toList());
    }
    
    private coutDTO mapToCout(coutrepas coutrepas) {
        coutDTO coutDTO = new coutDTO();
        coutDTO.setIdcout(coutrepas.getIdcout());
        coutDTO.setDateRepas(coutrepas.getDateRepas());
        coutDTO.setCoutrepas(coutrepas.getCoutrepas());
        coutDTO.setMontantjour(coutrepas.getMontantjour());
    
        // Récupérer le repasservi pour ce coutrepas
        repasservi repas = repaserviRepository.findByCoutrepas(coutrepas);
        if (repas != null) {
            dtoUsercalcul user = new dtoUsercalcul();
            user.setNombreuser(repas.getRepaservi());
            coutDTO.setUser(user);
        } else {
            // Gérer le cas où aucun repasservi n'est trouvé pour ce coutrepas
            // Vous pouvez par exemple initialiser coutDTO.setUser() à un utilisateur par défaut
        }
        
        return coutDTO;
    }
    
    

    @GetMapping("/calculMontantTotalParJour/{dateSortie}")
    public ResponseEntity<String> calculerMontantTotalParJour(@PathVariable("dateSortie") Date dateSortie) {
        try {
            // Récupérer toutes les bonnes de sortie pour la date donnée
            List<bondeSortie> bondeSorties = bondesortieRepository.findByDateSortie(dateSortie);

            // Initialiser le montant total des repas pour la journée
            double montantTotalRepas = 0.0;

            // Parcourir chaque bonde de sortie pour calculer le montant total des repas
            for (bondeSortie bondeSortie : bondeSorties) {
                // Récupérer tous les détails de sortie pour cette bonde de sortie
                List<detailsortie> detailsSorties = detailsortieRepository.findByBondeSortie(bondeSortie);

                // Calculer le montant total des repas pour cette bonde de sortie
                for (detailsortie detailsortie : detailsSorties) {
                    if (detailsortie.getMotif().equals("Utilise")) {
                        montantTotalRepas += detailsortie.getQte() * detailsortie.getProduit().getPrix_unitaire();
                    }
                }
            }

            // Enregistrement ou mise à jour du montant total des repas pour cette journée
            // dans coutrepas
            Optional<coutrepas> cout = coutrepasRepository.findByDateRepas(dateSortie);
            if (cout.isPresent()) {
                // Si une entrée existe déjà pour cette date, la mettre à jour
                coutrepas coutToUpdate = cout.get();
                coutToUpdate.setMontantjour(montantTotalRepas);
                coutrepasRepository.save(coutToUpdate);
            } else {
                // Sinon, créer une nouvelle entrée
                coutrepas newCout = new coutrepas();
                newCout.setDateRepas(dateSortie);
                newCout.setMontantjour(montantTotalRepas);
                coutrepasRepository.save(newCout);
            }

            return ResponseEntity.ok("Montant total calculé et mis à jour pour la journée.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors du calcul du montant total pour la journée.");
        }
    }
    @PostMapping("/ajoutcalcul")
    public ResponseEntity<?> calculerCoutParUtilisateur(@RequestBody List<coutDTO> coutDTOList) {
        List<coutDTO> coutDTOListFiltered = new ArrayList<>();
        try {
            for (coutDTO coutDTO : coutDTOList) {
                if (coutDTO.getDateRepas() != null && coutDTO.getCoutrepas() != null && coutDTO.getMontantjour() != null) {
                    coutrepas repas = new coutrepas();
                    repas.setDateRepas(coutDTO.getDateRepas());
                    repas.setMontantjour(coutDTO.getMontantjour());
                    repas.setCoutrepas(coutDTO.getCoutrepas());
                    
                    // Enregistrement de l'objet coutrepas
                    coutrepas savedRepas = coutrepasRepository.save(repas);
    
                    // Récupération du repasservi
                    repasservi servi = repaserviRepository.findByDateServi(coutDTO.getDateRepas());
                    
                    if (servi != null) { // Vérifier si servi est non null
                        // Mise à jour du repasservi avec la référence à l'objet coutrepas
                        servi.setCoutrepas(savedRepas);
                        repaserviRepository.save(servi);
    
                        // Mise à jour des bondeSortie avec la référence à l'objet coutrepas
                        List<bondeSortie> sortieList = bondesortieRepository.findByDateSortie(coutDTO.getDateRepas());
                        for (bondeSortie sortie : sortieList) {
                            sortie.setCoutrepas(savedRepas);
                            bondesortieRepository.save(sortie);
                        }
    
                        coutDTOListFiltered.add(coutDTO);
                    } else {
                        // Servi est null, afficher un message d'erreur ou gérer le cas en conséquence
                        return ResponseEntity.badRequest().body("Aucun repasservi trouvé pour la date spécifiée.");
                    }
                } else {
                    // Les données reçues sont incomplètes ou incorrectes
                    return ResponseEntity.badRequest().body("Les données reçues sont incomplètes ou incorrectes.");
                }
            }
    
            return ResponseEntity.ok(coutDTOListFiltered);
        } catch (Exception e) {
            // Gérer les erreurs
            e.printStackTrace(); // Afficher la trace de l'erreur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors du traitement des données : " + e.getMessage());
        }
    }
    
    @GetMapping("/MontantTotalParJour/{dateSortie}")
    public ResponseEntity<Double> MontantTotalParJour(@PathVariable("dateSortie") Date dateSortie) {
        try {
            // Récupérer toutes les bonnes de sortie pour la date donnée
            List<bondeSortie> bondeSorties = bondesortieRepository.findByDateSortie(dateSortie);

            // Initialiser le montant total des repas pour la journée
            double montantTotalRepas = 0.0;

            // Parcourir chaque bonde de sortie pour calculer le montant total des repas
            for (bondeSortie bondeSortie : bondeSorties) {
                // Récupérer tous les détails de sortie pour cette bonde de sortie
                List<detailsortie> detailsSorties = detailsortieRepository.findByBondeSortie(bondeSortie);

                // Calculer le montant total des repas pour cette bonde de sortie
                for (detailsortie detailsortie : detailsSorties) {
                    if (detailsortie.getMotif().equals("Utilise")) {
                        montantTotalRepas += detailsortie.getQte() * detailsortie.getProduit().getPrix_unitaire();
                    }
                }
            }

           

            return ResponseEntity.ok(montantTotalRepas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(-1.0); // Valeur par défaut pour l'erreur
        }
    }


    @GetMapping("/coutRepasActuel")
    public ResponseEntity<CoutRepasDTO> getCoutRepasActuel() {
        try {
            // Récupérer la date système
            Date dateSysteme = Date.valueOf(LocalDate.now());
            
            // Chercher les coûts repas inférieurs ou égaux à la date système, triés par ordre décroissant
            Optional<coutrepas> coutRepasOpt = coutrepasRepository.findFirstByDateRepasLessThanEqualOrderByDateRepasDesc(dateSysteme);
            
            // S'il y a un coût repas trouvé
            if (coutRepasOpt.isPresent()) {
                // Récupérer la date et le montant du coût repas
                Date dateRepas = coutRepasOpt.get().getDateRepas();
                Double coutRepas = coutRepasOpt.get().getCoutrepas();
              // Créer un objet CoutRepasDTO avec les valeurs appropriées
CoutRepasDTO coutRepasDTO = new CoutRepasDTO();
coutRepasDTO.setCoutRepas(coutRepas);
coutRepasDTO.setDateRepas(dateRepas);

                return ResponseEntity.ok(coutRepasDTO);
            } else {
                // Aucun coût repas trouvé
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace(); // Afficher la trace de l'erreur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

}