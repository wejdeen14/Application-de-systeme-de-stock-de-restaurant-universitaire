package com.example.restaurant_universitaire.Controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.livDTO;
import com.example.restaurant_universitaire.DTO.livNull;
import com.example.restaurant_universitaire.DTO.livinfo;
import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.bondecommande;
import com.example.restaurant_universitaire.Model.categorie;
import com.example.restaurant_universitaire.Model.detailslivraison;
import com.example.restaurant_universitaire.Model.fournisseur;
import com.example.restaurant_universitaire.Model.livraisoncommande;
import com.example.restaurant_universitaire.Repository.bondcommandeRepository;
import com.example.restaurant_universitaire.Repository.categorieRepository;
import com.example.restaurant_universitaire.Repository.detailslivRepository;
import com.example.restaurant_universitaire.Repository.livcommandeRepository;
import com.example.restaurant_universitaire.Repository.produitstockRepository;

@RequestMapping("liv")
@CrossOrigin("*")
@RestController
public class livController {
    @Autowired
    private livcommandeRepository livcommandeRepository;
    @Autowired
    private detailslivRepository detailslivRepository;
    @Autowired
    private produitstockRepository produitstockRepository;
    @Autowired
    private categorieRepository categorieRepository;
    @Autowired
    private bondcommandeRepository bondcommandeRepository;

    @GetMapping
    public List<livDTO> listLivraison() {
        List<livraisoncommande> livraison = livcommandeRepository.findAll();
        return livraison.stream().map(this::mapTolivDTO).collect(Collectors.toList());
    }

    private livDTO mapTolivDTO(livraisoncommande livraisoncommande) {
        livDTO livDTO = new livDTO();
        livDTO.setId_liv(livraisoncommande.getIdLiv());
        livDTO.setDate_liv(livraisoncommande.getDate_liv());
        livDTO.setPrix_totale(livraisoncommande.getPrix_totale());

        // Vérifier si la facture associée à la livraison n'est pas nulle avant
        // d'accéder à son ID
        if (livraisoncommande.getFacture() != null && livraisoncommande.getFacture().getIdFac() != null) {
            livDTO.setIdFac(livraisoncommande.getFacture().getIdFac());
        } else {
            // Gérer le cas où la facture est absente ou n'a pas d'ID associé
            livDTO.setIdFac(null); // ou toute autre logique appropriée selon vos besoins
        }

        List<detailslivraison> detailsliv = detailslivRepository.findByLivraisoncommande(livraisoncommande);

        List<livinfo> infos = new ArrayList<>();

        for (detailslivraison detailslivraison : detailsliv) {
            livinfo liv = new livinfo();
            liv.setId_detailsliv(detailslivraison.getId_detailsliv());
            liv.setQte(detailslivraison.getQte());
            liv.setPrix_unitaire(detailslivraison.getPrix_unitaire());
            liv.setUnite(detailslivraison.getUnite());
            liv.setDatexp(detailslivraison.getDatexp());
            liv.setNomProd(detailslivraison.getProduit().getNomProd());

            liv.setNomCategorie(detailslivraison.getProduit().getCategorie().getNomCategorie());
            liv.setNom_for(detailslivraison.getProduit().getCategorie().getFournisseur().getNom_for());
            liv.setTel_for(detailslivraison.getProduit().getCategorie().getFournisseur().getTel_for());

            liv.setMail_for(detailslivraison.getProduit().getCategorie().getFournisseur().getMail_for());

            infos.add(liv);

        }

        livDTO.setLivDetail(infos);
        return livDTO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<livDTO> getListLiv(@PathVariable Long id) {
        livraisoncommande liv = livcommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bonde de commande non trouvée avec l'identifiant : " + id));
        livDTO livDtO = mapTolivDTO(liv);
        return ResponseEntity.ok(livDtO);
    }

    @DeleteMapping("/supp/{id}")
    public ResponseEntity<Void> suppLiv(@PathVariable Long id) {
        livraisoncommande liv = livcommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bonde de commande non trouvée avec l'identifiant : " + id));

        List<detailslivraison> detailsLivraison = detailslivRepository.findByLivraisoncommande(liv);

      
        for (detailslivraison details : detailsLivraison) {
            ProduitStock produit = details.getProduit();
            if (produit != null) {
                double quantiteRetiree = details.getQte(); // Quantité retirée de la commande
                double quantiteActuelle = produit.getQte(); // Quantité actuelle en stock du produit

                
                if (quantiteActuelle >= quantiteRetiree) {
                    // Mettre à jour la quantité en stock en ajoutant la quantité retirée
                    produit.setQte(quantiteActuelle - quantiteRetiree);

                    // Enregistrement du produit mis à jour dans le stock
                    produitstockRepository.save(produit);
                } else {
                    // Gérer le cas où la quantité à retirer est supérieure à la quantité en stock
                    
                }
            }
        }

        // Après avoir ajusté les quantités en stock, supprimer les détails de livraison
        for (detailslivraison details : detailsLivraison) {
            detailslivRepository.delete(details);
        }

        // Enfin, supprimer la commande de livraison elle-même
        livcommandeRepository.delete(liv);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/AjoutLiv")
public String AjoutLiv(@RequestBody livDTO livDTO) {

    livraisoncommande liv = new livraisoncommande();
    liv.setDate_liv(livDTO.getDate_liv());
    liv.setPrix_totale(livDTO.getPrix_totale());
    liv = livcommandeRepository.save(liv);

    bondecommande bonde = bondcommandeRepository.findByIdCmd(livDTO.getIdCmd());
    if (bonde != null) {
        bonde.setLivraisoncommande(liv);
        bondcommandeRepository.save(bonde);
    }

    List<livinfo> livinfoList = livDTO.getLivDetail();

    for (livinfo info : livinfoList) {
        ProduitStock produit = produitstockRepository.findByNomProd(info.getNomProd());
        
        if (produit == null) {
            produit = new ProduitStock();
            produit.setNomProd(info.getNomProd());
            produit.setQte(info.getQte());
            produit.setUnite(info.getUnite());
            produit.setPrix_unitaire(info.getPrix_unitaire());
        } else {
            Double prix = (((produit.getQte() * produit.getPrix_unitaire()) + (info.getQte() * info.getPrix_unitaire())) / (produit.getQte() + info.getQte()));
            produit.setQte(produit.getQte() + info.getQte());
            produit.setUnite(info.getUnite());
            produit.setPrix_unitaire(prix);
        }

        updateExpirationDate(produit, info.getDatexp());
        produit = produitstockRepository.save(produit);

        detailslivraison nvliv = new detailslivraison();
        nvliv.setQte(info.getQte());
        nvliv.setUnite(info.getUnite());
        nvliv.setProduit(produit);
        nvliv.setPrix_unitaire(info.getPrix_unitaire());
        nvliv.setDatexp(info.getDatexp());
        nvliv.setLivraisoncommande(liv);

        detailslivRepository.save(nvliv);
    }

    return "livraison ajoutée avec succès";
}


    private void updateExpirationDate(ProduitStock produit, Date nouvelleDateExpiration) {
        if (nouvelleDateExpiration == null) {
            return; // Si la nouvelle date d'expiration est nulle, ne rien faire
        }

        // Récupérer la date actuelle du système
        Date currentDate = new Date(System.currentTimeMillis());
        // Date actuelle du système

        if (produit.getDate_peremption() == null || // Si la date de péremption du produit est nulle
                (nouvelleDateExpiration.after(currentDate) && // Et que la nouvelle date d'expiration est après la date
                                                              // actuelle
                        (produit.getDate_peremption().before(currentDate) || // Ou que la date de péremption actuelle
                                                                             // est avant la date actuelle
                                nouvelleDateExpiration.before(produit.getDate_peremption())))) { // Ou que la nouvelle
                                                                                                 // date d'expiration
                                                                                                 // est avant l'ancienne
            produit.setDate_peremption(nouvelleDateExpiration); // Mettre à jour la date de péremption du produit avec
                                                                // la nouvelle date
            produitstockRepository.save(produit); // Enregistrer le produit mis à jour dans la base de données
        }
    }

    @GetMapping("/livraisons-idFac-null")
    public ResponseEntity<List<livNull>> getLivraisonsIdFacNull() {
        try {
            List<livraisoncommande> livraisonsIdFacNull = livcommandeRepository.findByFactureIsNull();

            List<livNull> livNullDTOs = livraisonsIdFacNull.stream()
                    .map(this::mapToLivNullDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(livNullDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private livNull mapToLivNullDTO(livraisoncommande livraison) {
        livNull livNullDTO = new livNull();
        livNullDTO.setId_liv(livraison.getIdLiv());
        livNullDTO.setDate_liv(livraison.getDate_liv());
        livNullDTO.setPrix_totale(livraison.getPrix_totale());
        // Exemple de récupération du nom et de l'ID du fournisseur à partir des détails
        // de la livraison
        List<detailslivraison> detailsLiv = detailslivRepository.findByLivraisoncommande(livraison);
        if (!detailsLiv.isEmpty()) {
            detailslivraison detailsLivraison = detailsLiv.get(0);
            ProduitStock produit = detailsLivraison.getProduit();
            if (produit != null) {
                categorie categorie = produit.getCategorie();
                if (categorie != null) {
                    fournisseur fournisseur = categorie.getFournisseur();
                    if (fournisseur != null) {
                        livNullDTO.setNomFor(fournisseur.getNom_for());
                        livNullDTO.setId_for(fournisseur.getId_for());
                    }
                }
            }
        }

        return livNullDTO;
    }

    
    @GetMapping("/count")
    public ResponseEntity<Long> countLivraisons() {
        Long count = livcommandeRepository.count(); // Compter le nombre total de livraisons enregistrées
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/paye")
    public ResponseEntity<List<Integer>> countLivraisonsPayeesEtNonPayees() {
        try {
            // Récupérer tous les détails de livraison
            Iterable<detailslivraison> details = detailslivRepository.findAll();
    
            // Initialiser les compteurs pour les détails de livraison payés et non payés
            int totalPaye = 0;
            int totalNonPaye = 0;
    
            // Parcourir tous les détails de livraison
            for (detailslivraison detail : details) {
                // Vérifier si le détail de livraison a une facture associée (idFac non nulle)
                if (detail.getLivraisoncommande() != null && detail.getLivraisoncommande().getFacture() != null
                        && detail.getLivraisoncommande().getFacture().getIdFac() != null) {
                    // Incrémenter le compteur des détails de livraison payés
                    totalPaye++;
                } else {
                    // Incrémenter le compteur des détails de livraison non payés
                    totalNonPaye++;
                }
            }
    
            // Créer une liste pour stocker les résultats
            List<Integer> results = new ArrayList<>();
            results.add(totalPaye); // Ajouter le nombre de détails de livraison payés
            results.add(totalNonPaye); // Ajouter le nombre de détails de livraison non payés
    
            // Retourner les résultats sous forme de ResponseEntity
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            // En cas d'erreur, renvoyer une réponse avec un code d'erreur interne du serveur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    




    
}
