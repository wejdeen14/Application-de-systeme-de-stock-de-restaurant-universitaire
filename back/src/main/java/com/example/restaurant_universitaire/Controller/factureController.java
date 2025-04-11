package com.example.restaurant_universitaire.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.factureDTO;
import com.example.restaurant_universitaire.DTO.livcmdDTO;
import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.categorie;
import com.example.restaurant_universitaire.Model.detailslivraison;
import com.example.restaurant_universitaire.Model.facture;
import com.example.restaurant_universitaire.Model.fournisseur;
import com.example.restaurant_universitaire.Model.livraisoncommande;
import com.example.restaurant_universitaire.Repository.factureRepository;
import com.example.restaurant_universitaire.Repository.livcommandeRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/factures") // Endpoint de l'API pour les factures
public class factureController {

    @Autowired
    private factureRepository factureRepository;

    @Autowired
    private livcommandeRepository livcommandeRepository;

    @GetMapping
    public List<factureDTO> getListFacture() {
        List<facture> factures = factureRepository.findAll();
        return factures.stream().map(this::mapToFactureDTO).collect(Collectors.toList());
    }

    private factureDTO mapToFactureDTO(facture facture) {
        factureDTO factureDTO = new factureDTO();

        factureDTO.setIdFac(facture.getIdFac());
        factureDTO.setDateFac(facture.getDateFac());
        factureDTO.setPrixFac(facture.getPrixFac());
        factureDTO.setPrixTVA(facture.getPrixTVA());

        List<livraisoncommande> detail = livcommandeRepository.findByFacture(facture);

        List<livcmdDTO> livcm = new ArrayList<>();
        for (livraisoncommande l : detail) {
            for (detailslivraison details : l.getDetailsliv()) {
                livcmdDTO fac = new livcmdDTO();
                fac.setIdLiv(l.getIdLiv());
                fac.setDate_liv(l.getDate_liv());
                fac.setPrix_totale(l.getPrix_totale());

                // Vérifier si les détails de la livraison ont une catégorie
                ProduitStock produit = details.getProduit();
                if (produit != null) {
                    categorie categorie = produit.getCategorie();
                    if (categorie != null) {
                        fournisseur fournisseur = categorie.getFournisseur();
                        if (fournisseur != null) {
                            fac.setNomFor(fournisseur.getNom_for());
                            fac.setMail_for(fournisseur.getMail_for());
                            fac.setTel_for(fournisseur.getTel_for());
                        }
                    }
                }
                livcm.add(fac);
            }
        }

        factureDTO.setLiv(livcm);
        return factureDTO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<factureDTO> show(@PathVariable Long id) {

        facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Facture non trouvée avec l'identifiant : " + id));

        factureDTO factureDTO = mapToFactureDTO(facture);

        return ResponseEntity.ok(factureDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFacture(@PathVariable Long id) {
        facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Facture non trouvée avec l'identifiant : " + id));

        // Désassocier la facture de ses détails (livraisons/commandes)
        List<livraisoncommande> details = livcommandeRepository.findByFacture(facture);
        for (livraisoncommande detail : details) {
            detail.setFacture(null); // Désassocier la facture
            livcommandeRepository.save(detail); // Enregistrer la modification
        }

        // Supprimer la facture une fois désassociée de ses détails
        factureRepository.delete(facture);

        return ResponseEntity.ok("Facture supprimée avec succès");
    }

    @PostMapping("/ajout")
    public ResponseEntity<String> AjoutFacture(@RequestBody List<factureDTO> factureDTOList) {
        try {
            for (factureDTO factureDTO : factureDTOList) {
                facture fac = new facture();
                fac.setIdFac(factureDTO.getIdFac());
                fac.setDateFac(factureDTO.getDateFac());
                fac.setPrixFac(factureDTO.getPrixFac());
                fac.setPrixTVA(factureDTO.getPrixTVA());

                // Enregistrez la facture dans la base de données
                facture facture = factureRepository.save(fac);

                List<livcmdDTO> livraisons = factureDTO.getLiv();
                for (livcmdDTO livraisonDTO : livraisons) {
                    List<livraisoncommande> liv = livcommandeRepository.findByIdLiv(livraisonDTO.getIdLiv());

                    for (livraisoncommande l : liv) {
                        l.setFacture(facture);
                        livcommandeRepository.save(l);
                    }
                }
                // financier yahsseb tva * 20
            }

            return ResponseEntity.ok("Factures ajoutées avec succès");
        } catch (Exception e) {
            // Gérez les erreurs en renvoyant une réponse avec le message d'erreur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'ajout des factures : " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countFacture() {

        Long count = factureRepository.count();
        Long cont = count;
        return ResponseEntity.ok(cont);
    }

}
