package com.example.restaurant_universitaire.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.dessertDTO;
import com.example.restaurant_universitaire.DTO.menuDTO;
import com.example.restaurant_universitaire.DTO.platDTO;
import com.example.restaurant_universitaire.DTO.suppDTO;
import com.example.restaurant_universitaire.Model.dessert;
import com.example.restaurant_universitaire.Model.menu;
import com.example.restaurant_universitaire.Model.plat;
import com.example.restaurant_universitaire.Model.supplimentaire;
import com.example.restaurant_universitaire.Repository.dessertRepository;
import com.example.restaurant_universitaire.Repository.menuRepository;
import com.example.restaurant_universitaire.Repository.platrepository;
import com.example.restaurant_universitaire.Repository.suppRepository;

@RequestMapping("menu")
@RestController
@CrossOrigin("*")
public class menuController {
    @Autowired
    private menuRepository MenuRepository;
    @Autowired
    private platrepository platrepository;
    @Autowired
    private dessertRepository dessertRepository;
    @Autowired
    private suppRepository suppRepository;
  
    @GetMapping
    public List<menuDTO> getList() {
        List<menu> menuList = MenuRepository.findAll();
        return menuList.stream().map(this::mapToMenuDTO).collect(Collectors.toList());
    }

    private menuDTO mapToMenuDTO(menu menu) {
        menuDTO menuDTO = new menuDTO();
        menuDTO.setIdMenu(menu.getIdMenu());
        menuDTO.setNomMenu(menu.getNomMenu());
        menuDTO.setDateCreation(menu.getDateCreation());

        List<plat> plats = platrepository.findByMenu(menu);
        List<platDTO> inclu = new ArrayList<>();
        for (plat plat : plats) {
            platDTO platDTO = new platDTO();
            platDTO.setId_plat(plat.getId_plat());
            platDTO.setPrincipale(plat.getPrincipale());
            platDTO.setEntre(plat.getEntre());

            // Récupérer les desserts pour ce plat
            List<dessert> desserts = plat.getDesserts();
            List<dessertDTO> dessertDTOs = new ArrayList<>();
            for (dessert d : desserts) {
                dessertDTO dessertDTO = new dessertDTO();
                dessertDTO.setIdDessert(d.getIdDessert());
                dessertDTO.setNomDessert(d.getNomDessert());
                dessertDTOs.add(dessertDTO);
            }
            platDTO.setDesserts(dessertDTOs);

            // Récupérer les supplémentaires pour ce plat
            List<supplimentaire> supplimentaires = plat.getSupplimentaires();
            List<suppDTO> suppDTOs = new ArrayList<>();
            for (supplimentaire supp : supplimentaires) {
                suppDTO suppDTO = new suppDTO();
                suppDTO.setIdSupp(supp.getIdSupp());
                suppDTO.setNomSupp(supp.getNomSupp());
                suppDTOs.add(suppDTO);
            }
            platDTO.setSupplimentaires(suppDTOs);

            inclu.add(platDTO);
        }
        menuDTO.setPlats(inclu);
        return menuDTO;
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menu menu = MenuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu not found with id: " + id));

        // Récupérer tous les plats liés à ce menu
        List<plat> plats = platrepository.findByMenu(menu);

        // Supprimer les plats
        for (plat p : plats) {
            platrepository.delete(p);
        }

        // Maintenant que les plats ont été supprimés, vous pouvez supprimer le menu
        MenuRepository.delete(menu);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<menuDTO> getShow(@PathVariable Long id) {
        menu menu = MenuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("id not found"));
        menuDTO menuDTO = mapToMenuDTO(menu); // Call mapToMenuDTO with the correct argument
        return ResponseEntity.ok(menuDTO);
    }

    @PostMapping("/AjoutMenu")
    public String AjoutMenu(@RequestBody menuDTO menuDTO) {
        menu menu = new menu();

        menu.setIdMenu(menuDTO.getIdMenu());
        menu.setNomMenu(menuDTO.getNomMenu());
        menu.setDateCreation(menuDTO.getDateCreation());
        menu = MenuRepository.save(menu);

        List<platDTO> plats = menuDTO.getPlats();

        for (platDTO p : plats) {
            plat plat = new plat();
            plat.setId_plat(p.getId_plat());
            plat.setEntre(p.getEntre());
            plat.setPrincipale(p.getPrincipale());
            plat.setMenu(menu);
            platrepository.save(plat);

            if (menu.getNomMenu().equals("MATIN") && (plat.getEntre() == null || plat.getPrincipale() == null)) {
                // Gérer le cas où le plat principal ou l'entrée est manquant pour le menu du
                // matin
                // Vous pouvez lancer une exception, enregistrer un message d'erreur, ou prendre
                // une autre action appropriée
                throw new RuntimeException("Les plats principaux et les entrées sont obligatoires pour le menu MATIN");
            }

            List<dessertDTO> desserts = p.getDesserts();
            for (dessertDTO d : desserts) {
                dessert dessert = new dessert();
                dessert.setIdDessert(d.getIdDessert());
                dessert.setNomDessert(d.getNomDessert());

                dessert.setPlat(plat); // Ajout du lien avec le plat

                dessertRepository.save(dessert);
            }

            List<suppDTO> supp = p.getSupplimentaires();
            for (suppDTO s : supp) {
                supplimentaire suppEntity = new supplimentaire();
                suppEntity.setIdSupp(s.getIdSupp());
                suppEntity.setNomSupp(s.getNomSupp());

                suppEntity.setPlat(plat); // Ajout du lien avec le plat

                suppRepository.save(suppEntity);
            }
        }

        return "Menu ajouté avec succès";
    }

    /*
     * @Autowired
     * private EntityManager entityManager; // Vous pouvez injecter directement
     * l'EntityManager
     * 
     * @GetMapping("/getNotificationCount")
     * public ResponseEntity<Integer> getNotificationCount() {
     * Query query =
     * entityManager.createQuery("SELECT COUNT(n) FROM Notification n");
     * Long count = (Long) query.getSingleResult();
     * return ResponseEntity.ok(count.intValue());
     * }
     */
}
