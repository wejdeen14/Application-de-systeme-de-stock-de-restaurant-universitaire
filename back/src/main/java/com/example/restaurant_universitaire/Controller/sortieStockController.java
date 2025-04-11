package com.example.restaurant_universitaire.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.detailSortieDTO;
import com.example.restaurant_universitaire.DTO.sortieDTO;
import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.bondeSortie;
import com.example.restaurant_universitaire.Model.detailsortie;
import com.example.restaurant_universitaire.Repository.bondesortieRepository;
import com.example.restaurant_universitaire.Repository.detailsortieRepository;
import com.example.restaurant_universitaire.Repository.produitstockRepository;

@CrossOrigin("*")
@RequestMapping("/prodSortie")
@RestController
public class sortieStockController {
    @Autowired
    private bondesortieRepository bondesortieRepository;
    @Autowired
    private detailsortieRepository detailsortieRepository;
    @Autowired
    private produitstockRepository produitstockRepository;
  @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @GetMapping
    public List<sortieDTO> ListeSortie() {
        List<bondeSortie> sortie = bondesortieRepository.findAll();

        return sortie.stream().map(this::mapToSortieDTO).collect(Collectors.toList());

    }

    private sortieDTO mapToSortieDTO(bondeSortie bondeSortie) {
        sortieDTO sortieDTO = new sortieDTO();

        sortieDTO.setId_sortie(bondeSortie.getId_sortie());
        sortieDTO.setDate_sortie(bondeSortie.getDateSortie());
        List<detailsortie> details = detailsortieRepository.findByBondeSortie(bondeSortie);

        List<detailSortieDTO> sort = new ArrayList<>();
        for (detailsortie detailsortie : details) {
            detailSortieDTO detailSortieDTO = new detailSortieDTO();
            detailSortieDTO.setId_detailSortie(detailsortie.getId_detailSortie());
            detailSortieDTO.setMotif(detailsortie.getMotif());
            detailSortieDTO.setQte(detailsortie.getQte());
            detailSortieDTO.setNom_categorie(detailsortie.getProduit().getCategorie().getNomCategorie());
            detailSortieDTO.setNomProd(detailsortie.getProduit().getNomProd());
            sort.add(detailSortieDTO);
        }
        sortieDTO.setSortie(sort);

        return sortieDTO;

    }

    @GetMapping("/{id}")
    public ResponseEntity<sortieDTO> getShow(@PathVariable Long id) {
        bondeSortie bondeSortie = bondesortieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("id not found"));
        sortieDTO sortieDTO = mapToSortieDTO(bondeSortie);
        return ResponseEntity.ok(sortieDTO);
    }

    @DeleteMapping("/annulationSortie/{id}")
    public ResponseEntity<Void> annulerSortie(@PathVariable Long id) {
        bondeSortie bondeSortie = bondesortieRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Bonde de sortie non trouvée avec l'identifiant : " + id));

        // Récupérer les détails de sortie associés à la bonde de sortie
        List<detailsortie> detailsSortie = detailsortieRepository.findByBondeSortie(bondeSortie);

        // Parcourir chaque détail de sortie pour récupérer les produits et restaurer
        // les stocks
        for (detailsortie detailSortie : detailsSortie) {
            ProduitStock produit = detailSortie.getProduit();

            // Restaurer la quantité du produit dans le stock
            produit.setQte(produit.getQte() + detailSortie.getQte());
            produitstockRepository.save(produit);
        }

        // Supprimer tous les détails de sortie associés à la bonde de sortie
        detailsortieRepository.deleteAll(detailsSortie);

        // Ensuite, supprimer la bonde de sortie elle-même
        bondesortieRepository.delete(bondeSortie);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addSortie")
    public String addSortie(@RequestBody sortieDTO sortieDTO) {
        try {
            // Création d'une nouvelle bonde de sortie instance
            bondeSortie nouvelleBondeSortie = new bondeSortie();
            nouvelleBondeSortie.setDateSortie(sortieDTO.getDate_sortie());

            // Initialiser le montant total de la bonde de sortie
            double montantTotalBonde = 0.0;

            bondeSortie savedBondeSortie = bondesortieRepository.save(nouvelleBondeSortie);

            List<detailSortieDTO> detail = sortieDTO.getSortie();
            if (detail == null) {
                return "La liste des détails de sortie est null";// test
            }

            // Parcourir les détails de la sortie
            for (detailSortieDTO detailSortieDTO : detail) {
                ProduitStock produit = produitstockRepository.findByNomProd(detailSortieDTO.getNomProd());
                if (produit == null) {
                    return "Le produit " + detailSortieDTO.getNomProd() + " n'est pas dans le stock ";
                }

                // Calculer le montant total pour ce détail de sortie
                double prixUnitaire = produit.getPrix_unitaire();
                double montantDetail = detailSortieDTO.getQte() * prixUnitaire;

                // Ajouter le montant total de ce détail au montant total de la bonde de sortie
                montantTotalBonde += montantDetail;

                // Création d'un nouveau détail de sortie
                detailsortie nouveauDetailSortie = new detailsortie();
                nouveauDetailSortie.setId_detailSortie(detailSortieDTO.getId_detailSortie());
                nouveauDetailSortie.setMotif(detailSortieDTO.getMotif());
                nouveauDetailSortie.setQte(detailSortieDTO.getQte());
                nouveauDetailSortie.setUnite(detailSortieDTO.getUnite());
                nouveauDetailSortie.setProduit(produit);
                nouveauDetailSortie.setBondeSortie(savedBondeSortie);

                // Enregistrement du nouveau détail de sortie
                detailsortieRepository.save(nouveauDetailSortie);

                // Soustraire la quantité de sortie de la quantité totale dans la table
                // produitstock
                produit.setQte(produit.getQte() - detailSortieDTO.getQte());
                produitstockRepository.save(produit);

                // Récupérer le nom de la catégorie
                String nomCategorie = produit.getCategorie().getNomCategorie();
                detailSortieDTO.setNom_categorie(nomCategorie);

                 // Vérifier si la quantité de produit est maintenant épuisée

            }

            // Mettre à jour le montant total de la bonde de sortie
           
            bondesortieRepository.save(savedBondeSortie);

            return "Sortie ajoutée avec succès";
        } catch (Exception e) {
            return "Une erreur s'est produite lors de l'ajout de la sortie";
        }
    }

    @GetMapping("/utilise")
    public ResponseEntity<Double> utilise() {
        try {
            Iterable<detailsortie> details = detailsortieRepository.findAll();

            double totalQuantity = 0.0;
            for (detailsortie detail : details) {
                if ("Utilise".equals(detail.getMotif())) {
                    totalQuantity += detail.getQte();
                }
            }
            return ResponseEntity.ok(totalQuantity);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1.0);
        }
    }

    @GetMapping("/Corrompu")
    public ResponseEntity<Double> Corrompu() {
        try {
            Iterable<detailsortie> details = detailsortieRepository.findAll();

            double totalQuantity = 0.0;
            for (detailsortie detail : details) {
                if ("Corrompu".equals(detail.getMotif())) {
                    totalQuantity += detail.getQte();
                }
            }
            return ResponseEntity.ok(totalQuantity);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1.0);
        }
    }

    @GetMapping("/Autre")
    public ResponseEntity<Double> Autre() {
        try {
            Iterable<detailsortie> details = detailsortieRepository.findAll();

            double totalQuantity = 0.0;
            for (detailsortie detail : details) {
                if ("Autre".equals(detail.getMotif())) {
                    totalQuantity += detail.getQte();
                }
            }
            return ResponseEntity.ok(totalQuantity);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1.0);
        }
    }

    @GetMapping("/quantiteProduit/{nomProduit}")
    public ResponseEntity<Double> quantiteProduit(@PathVariable String nomProduit) {
        try {
            // Récupérer le produit par son nom
            ProduitStock produit = produitstockRepository.findByNomProd(nomProduit);

            // Vérifier si le produit existe
            if (produit == null) {
                return ResponseEntity.notFound().build();
            }

            // Récupérer la quantité du produit
            double quantite = produit.getQte();

            return ResponseEntity.ok(quantite);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1.0);
        }
    }



    @PutMapping("/updateSortie/{id}")
public ResponseEntity<String> updateSortie(@PathVariable Long id, @RequestBody sortieDTO sortieDTO) {
    try {
        // Récupérer la bonde de sortie existante par son ID
        bondeSortie existingBondeSortie = bondesortieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bonde de sortie non trouvée avec l'identifiant : " + id));

        // Mettre à jour la date de sortie
        existingBondeSortie.setDateSortie(sortieDTO.getDate_sortie());

        // Récupérer les détails de sortie existants associés à la bonde de sortie
        List<detailsortie> existingDetailsSortie = detailsortieRepository.findByBondeSortie(existingBondeSortie);

        // Restaurer les quantités des produits dans le stock pour les détails de sortie existants
        for (detailsortie detailSortie : existingDetailsSortie) {
            ProduitStock produit = detailSortie.getProduit();
            produit.setQte(produit.getQte() + detailSortie.getQte());
            produitstockRepository.save(produit);
        }

        // Supprimer les détails de sortie existants
        detailsortieRepository.deleteAll(existingDetailsSortie);

        // Initialiser le montant total de la bonde de sortie
        double montantTotalBonde = 0.0;

        List<detailSortieDTO> detail = sortieDTO.getSortie();
        if (detail == null) {
            return ResponseEntity.badRequest().body("La liste des détails de sortie est null");
        }

        // Parcourir les nouveaux détails de la sortie et créer de nouveaux détails de sortie
        for (detailSortieDTO detailSortieDTO : detail) {
            ProduitStock produit = produitstockRepository.findByNomProd(detailSortieDTO.getNomProd());
            if (produit == null) {
                return ResponseEntity.badRequest().body("Le produit " + detailSortieDTO.getNomProd() + " n'est pas dans le stock");
            }

            // Calculer le montant total pour ce détail de sortie
            double prixUnitaire = produit.getPrix_unitaire();
            double montantDetail = detailSortieDTO.getQte() * prixUnitaire;

            // Ajouter le montant total de ce détail au montant total de la bonde de sortie
            montantTotalBonde += montantDetail;

            // Création d'un nouveau détail de sortie
            detailsortie nouveauDetailSortie = new detailsortie();
            nouveauDetailSortie.setMotif(detailSortieDTO.getMotif());
            nouveauDetailSortie.setQte(detailSortieDTO.getQte());
            nouveauDetailSortie.setUnite(detailSortieDTO.getUnite());
            nouveauDetailSortie.setProduit(produit);
            nouveauDetailSortie.setBondeSortie(existingBondeSortie);

            // Enregistrement du nouveau détail de sortie
            detailsortieRepository.save(nouveauDetailSortie);

            // Soustraire la quantité de sortie de la quantité totale dans la table produitstock
            produit.setQte(produit.getQte() - detailSortieDTO.getQte());
            produitstockRepository.save(produit);
        }

        // Mettre à jour la bonde de sortie
        bondesortieRepository.save(existingBondeSortie);

        return ResponseEntity.ok("Sortie mise à jour avec succès");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de la mise à jour de la sortie");
    }
}

}
