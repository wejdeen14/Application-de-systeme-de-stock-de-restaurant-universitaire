package com.example.restaurant_universitaire.Controller;

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

import com.example.restaurant_universitaire.DTO.FournisseurCategorieDTO;
import com.example.restaurant_universitaire.DTO.categorieDTO;
import com.example.restaurant_universitaire.DTO.fournisseurDTO;
import com.example.restaurant_universitaire.Model.categorie;
import com.example.restaurant_universitaire.Model.fournisseur;
import com.example.restaurant_universitaire.Repository.categorieRepository;
import com.example.restaurant_universitaire.Repository.fournisseurRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/four")
public class categoriefornisseurController {

    @Autowired
    private fournisseurRepository fournisseurRepository;
    @Autowired
    private categorieRepository categorieRepository;

    @GetMapping("/fournisseurs")
    public List<fournisseurDTO> getFournisseursWithCategories() {
        List<fournisseur> fournisseurs = fournisseurRepository.findAll();
        return fournisseurs.stream().map(this::mapToFournisseurDTO).collect(Collectors.toList());
    }

    private fournisseurDTO mapToFournisseurDTO(fournisseur fournisseur) {
        fournisseurDTO fournisseurDTO = new fournisseurDTO();
        fournisseurDTO.setId_for(fournisseur.getId_for());
        fournisseurDTO.setNom_for(fournisseur.getNom_for());
        fournisseurDTO.setTel_for(fournisseur.getTel_for());
        fournisseurDTO.setMail_for(fournisseur.getMail_for());
        fournisseurDTO.setCategories(
                fournisseur.getCategories().stream().map(categorie::getNomCategorie).collect(Collectors.toList()));
        return fournisseurDTO;
    }

    @PostMapping("/ajouter")
    public String add(@RequestBody FournisseurCategorieDTO fournisseurCategorieDTO) {
        fournisseur fournisseur = fournisseurCategorieDTO.getFournisseur();
        List<String> categories = fournisseurCategorieDTO.getCategories();

        // Enregistrez d'abord le fournisseur
        fournisseurRepository.save(fournisseur);

        // Ajoutez chaque catégorie au fournisseur
        for (String categorie : categories) {
            categorie categorieEntity = new categorie();
            categorieEntity.setNomCategorie(categorie);
            categorieEntity.setFournisseur(fournisseur);
            categorieRepository.save(categorieEntity);
        }

        return "Fournisseur et catégories ajoutés avec succès";
    }

    @GetMapping("/{id}")
    public ResponseEntity<fournisseurDTO> getidFournisseur(@PathVariable Long id) {
        fournisseur fournisseur = fournisseurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé avec l'identifiant : " + id));
        fournisseurDTO fournisseurDTO = mapToFournisseurDTO(fournisseur);
        return ResponseEntity.ok(fournisseurDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletefor(@PathVariable Long id) {
        fournisseur fournisseur = fournisseurRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Aucun fournisseur trouvé avec cet identifiant : " + id));
        fournisseurRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<fournisseurDTO> updatefor(@PathVariable Long id, @RequestBody fournisseurDTO newfor) {
        fournisseur oldfor = fournisseurRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Aucun fournisseur trouvé avec cet identifiant : " + id));

        // Mettre à jour les informations du fournisseur
        oldfor.setNom_for(newfor.getNom_for());
        oldfor.setTel_for(newfor.getTel_for());
        oldfor.setMail_for(newfor.getMail_for());

        // Supprimer les anciennes catégories du fournisseur
        oldfor.getCategories().clear();

        // Ajouter les nouvelles catégories au fournisseur
        for (String categoryName : newfor.getCategories()) {
            categorie categorieEntity = new categorie();
            categorieEntity.setNomCategorie(categoryName);
            categorieEntity.setFournisseur(oldfor);
            categorieRepository.save(categorieEntity);
        }

        // Enregistrer les modifications du fournisseur
        fournisseurRepository.save(oldfor);

        return new ResponseEntity<>(newfor, HttpStatus.OK);
    }



    @GetMapping("/fournisseurs-categories")
public ResponseEntity<List<categorieDTO>> ajoutforetcategorie() {
    List<fournisseur> fournisseurs = fournisseurRepository.findAll();

    List<categorieDTO> categorieDTO = fournisseurs.stream()
            .map(this::mapToFournisseurCategorieDTO)
            .collect(Collectors.toList());

    return ResponseEntity.ok(categorieDTO);
}

private categorieDTO mapToFournisseurCategorieDTO(fournisseur fournisseur) {
    categorieDTO categorieDTO = new categorieDTO();
    categorieDTO.setId_for(fournisseur.getId_for());
    categorieDTO.setNom_for(fournisseur.getNom_for());
   

    // Récupérer les catégories associées à ce fournisseur
    List<String> categories = fournisseur.getCategories().stream()
            .map(categorie::getNomCategorie)
            .collect(Collectors.toList());

            categorieDTO.setCategories(categories);

    return categorieDTO;


}



@GetMapping("/count")
public ResponseEntity<Long> countFor() {
  
    Long count = fournisseurRepository.count();
Long cont= count;
    return ResponseEntity.ok(cont);
}
}
