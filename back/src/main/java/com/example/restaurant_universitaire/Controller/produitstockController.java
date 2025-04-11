package com.example.restaurant_universitaire.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.example.restaurant_universitaire.DTO.produitDTO;
import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.categorie;
import com.example.restaurant_universitaire.Repository.categorieRepository;
import com.example.restaurant_universitaire.Repository.produitstockRepository;

@RequestMapping("prod")
@CrossOrigin("*")
@RestController
public class produitstockController {
    @Autowired
    private produitstockRepository ProduitstockRepository;

    @Autowired
    private categorieRepository categorieRepository;

    @GetMapping
    public List<Map<String, Object>> getlisteProduit() {
        List<ProduitStock> produits = ProduitstockRepository.findAll();
        List<Map<String, Object>> produitsAvecCategorie = new ArrayList<>();

        for (ProduitStock produit : produits) {
            Map<String, Object> produitAvecCategorie = new HashMap<>();
            produitAvecCategorie.put("id_prod", produit.getId_prod());
            produitAvecCategorie.put("nom_prod", produit.getNomProd());

            produitAvecCategorie.put("qte", produit.getQte());
            produitAvecCategorie.put("unite", produit.getUnite());
            produitAvecCategorie.put("prix_unitaire", produit.getPrix_unitaire());
            produitAvecCategorie.put("date_peremption", produit.getDate_peremption());
            produitAvecCategorie.put("nom_categorie", produit.getCategorie().getNomCategorie());
            produitsAvecCategorie.add(produitAvecCategorie);
        }

        return produitsAvecCategorie;
    }

    @GetMapping("/count")
    public ResponseEntity<Double> countProd() {
        try {

            Iterable<ProduitStock> produits = ProduitstockRepository.findAll();

            // Initialiser la variable pour stocker le total de la quantité
            double totalQuantity = 0.0;

            // Parcourir tous les produits et ajouter leur quantité au total
            for (ProduitStock produit : produits) {
                totalQuantity += produit.getQte();
            }

            // Retourner la quantité totale sous forme de ResponseEntity
            return ResponseEntity.ok(totalQuantity);
        } catch (Exception e) {
            // Gérer toute exception survenue lors du calcul
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1.0);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody produitDTO produitDTO) {
        try {
            // Créer une instance de ProduitStock
            ProduitStock produit = new ProduitStock();
            produit.setNomProd(produitDTO.getNomProd());
            produit.setQte(produitDTO.getQte());
            produit.setUnite(produitDTO.getUnite());
            produit.setPrix_unitaire(produitDTO.getPrixUnitaire());

            categorie categorie = categorieRepository.findByNomCategorie(produitDTO.getCategorie());
            produit.setCategorie(categorie);

            ProduitStock newProduct = ProduitstockRepository.save(produit);

            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout du produit");
        }
    }

    @GetMapping("/verifyProduit/{nomProduit}")
    public ResponseEntity<Map<String, Boolean>> verifyProduitExistence(@PathVariable String nomProduit) {
        // Vérifier si un produit avec le même nom existe déjà dans la base de données
        boolean exists = ProduitstockRepository.existsByNomProd(nomProduit);

        // Créer une réponse indiquant si le produit existe déjà ou non
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return ResponseEntity.ok(response);
    }





    @GetMapping("/produits-par-categorie/{nomCategorie}")
    public ResponseEntity<List<Map<String, Object>>> getProduitsParCategorie(@PathVariable("nomCategorie") String nomCategorie) {
        try {
            categorie categorie = categorieRepository.findByNomCategorie(nomCategorie);
            if (categorie == null) {
                return ResponseEntity.notFound().build();
            }
    
            List<ProduitStock> produits = ProduitstockRepository.findByCategorie(categorie);
    
            List<Map<String, Object>> produitsList = new ArrayList<>();
            for (ProduitStock produit : produits) {
                Map<String, Object> produitData = new HashMap<>();
                produitData.put("nom_prod", produit.getNomProd());
                produitsList.add(produitData);
            }
    
            return ResponseEntity.ok(produitsList);
        } catch (Exception e) {
            // Handle any exception that occurs during the process
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    

}