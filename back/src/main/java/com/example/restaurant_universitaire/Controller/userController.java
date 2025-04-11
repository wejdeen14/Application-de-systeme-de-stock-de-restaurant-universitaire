package com.example.restaurant_universitaire.Controller;

import java.util.List;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.Model.user;
import com.example.restaurant_universitaire.Repository.userRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class userController {
    @Autowired
    private userRepository UserRepository;

    @GetMapping
    public List<user> getAllUsers() {
        return UserRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<user> getUserById(@PathVariable long id) {
        user user = UserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}") // mise a jour
    public ResponseEntity<user> updateUser(@PathVariable long id, @RequestBody user userNew) {
        user oldUser = UserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun utilisateur existe par cette id : " + id));
        oldUser.setIdentite(userNew.getIdentite());
        oldUser.setNom(userNew.getNom());
        oldUser.setPrenom(userNew.getPrenom());
        oldUser.setGenre(userNew.getGenre());
        oldUser.setMail(userNew.getMail());
        oldUser.setTel(userNew.getTel());

        oldUser.setMot_de_passe(userNew.getMot_de_passe());
        oldUser.setRole(userNew.getRole());
        oldUser.setImgUser(userNew.getImgUser());
        UserRepository.save(oldUser);

        return ResponseEntity.ok(oldUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        user user = UserRepository.findById(id) // recuperer user li ando Id haka
                .orElseThrow(() -> new ResourceNotFoundException("Aucun utilisateur existe par cette id : " + id));

        UserRepository.delete(user);// supp

        return ResponseEntity.noContent().build(); // nahyh mel table
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countUsers() {
        // Compter le nombre total d'utilisateurs dans la base de données
        Long count = UserRepository.count();
        Long cont = count - 1;
        return ResponseEntity.ok(cont);
    }
}