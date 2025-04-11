package com.example.restaurant_universitaire.Controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.restaurant_universitaire.Model.repasservi;
import com.example.restaurant_universitaire.Repository.repaserviRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/repas")
public class repaserviController {

    @Autowired
    private repaserviRepository repaserviRepository;

    @GetMapping("/list")
    public List<Map<String, Object>> getListeRepasservi() {
        List<repasservi> repasservis = repaserviRepository.findAll();
        List<Map<String, Object>> repasservisAvecInfos = new ArrayList<>();

        for (repasservi repasservi : repasservis) {
            Map<String, Object> repasserviAvecInfos = new HashMap<>();
            repasserviAvecInfos.put("idrepas", repasservi.getIdrepas());
            repasserviAvecInfos.put("dateServi", repasservi.getDateServi());
            repasserviAvecInfos.put("nbEtudient", repasservi.getNbEtudient());
            repasserviAvecInfos.put("nbAgent", repasservi.getNbAgent());
            repasserviAvecInfos.put("nbouvrier", repasservi.getNbouvrier());
            repasserviAvecInfos.put("repaservi", repasservi.getRepaservi());

            repasservisAvecInfos.add(repasserviAvecInfos);
        }

        return repasservisAvecInfos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<repasservi> showrepas(@PathVariable Long id) {
        repasservi repas = repaserviRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("repas not found with id: " + id));
        return ResponseEntity.ok(repas);
    }

    @PostMapping("/Ajoutrepas")
    public repasservi AjoutRepas(@RequestBody repasservi repas) {
        return repaserviRepository.save(repas);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> Deleterepas(@PathVariable Long id) {
        repasservi repas = repaserviRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("repas not found with id: " + id));

        repaserviRepository.delete(repas);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updaterepas/{id}")
    public ResponseEntity<repasservi> updateUser(@PathVariable long id, @RequestBody repasservi repasNew) {
        repasservi oldRepas = repaserviRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun repas trouvé avec cet ID : " + id));

        // Mettre à jour les données du repas avec les nouvelles valeurs
        oldRepas.setDateServi(repasNew.getDateServi());
        oldRepas.setNbEtudient(repasNew.getNbEtudient());
        oldRepas.setNbAgent(repasNew.getNbAgent());
        oldRepas.setNbouvrier(repasNew.getNbouvrier());
        oldRepas.setRepaservi(repasNew.getRepaservi());

        // Sauvegarder les modifications dans la base de données
        repaserviRepository.save(oldRepas);

        // Retourner une réponse avec le repas mis à jour
        return ResponseEntity.ok(oldRepas);
    }

    @GetMapping("/dates")
    public List<Date> getDatesOfRepasServisWithNullIdCout() {
        List<repasservi> repasServis = repaserviRepository.findAll();
        List<Date> dates = new ArrayList<>();

        for (repasservi repas : repasServis) {
            if (repas.getCoutrepas() == null) {
                dates.add(repas.getDateServi());
            }
        }

        return dates;
    }

    @GetMapping("/details/{dateServi}")
    public int getRepasServisByDate(@PathVariable("dateServi") Date dateServi) {
        // Utilisez la méthode findByDateServi pour récupérer tous les repas servis pour
        // la date spécifiée
        repasservi repas = repaserviRepository.findByDateServi(dateServi);

        return repas.getRepaservi();
    }

    @GetMapping("/verifyDate/{dateServi}")
    public ResponseEntity<Map<String, Boolean>> verifyDateExistence(@PathVariable Date dateServi) {
        // Vérifier si un repas avec la même date existe déjà dans la base de données
        boolean exists = repaserviRepository.existsByDateServi(dateServi);

        // Créer une réponse indiquant si la date existe déjà ou non
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/agents")
public int countAgents() {
    List<repasservi> repasservis = repaserviRepository.findAll();
    int totalAgents = 0;

    for (repasservi repas : repasservis) {
        totalAgents += repas.getNbAgent();
    }

    return totalAgents;
}


@GetMapping("/etudiant")
public int countEtudient() {
    List<repasservi> repasservis = repaserviRepository.findAll();
    int totaleEtudient = 0;

    for (repasservi repas : repasservis) {
        totaleEtudient += repas.getNbEtudient();
    }

    return totaleEtudient;
}

@GetMapping("/ouvrier")
public int countOuvrier() {
    List<repasservi> repasservis = repaserviRepository.findAll();
    int totaleouvrier = 0;

    for (repasservi repas : repasservis) {
        totaleouvrier += repas.getNbouvrier();
    }

    return totaleouvrier;
}
}