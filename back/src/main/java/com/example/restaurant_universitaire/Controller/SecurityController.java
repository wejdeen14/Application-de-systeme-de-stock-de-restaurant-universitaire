package com.example.restaurant_universitaire.Controller;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.restaurant_universitaire.Auth.ExceptionModel;
import com.example.restaurant_universitaire.Auth.LoginModel;
import com.example.restaurant_universitaire.Auth.ResponseModel;
import com.example.restaurant_universitaire.Auth.ResponseObjModel;
import com.example.restaurant_universitaire.Model.user;
import com.example.restaurant_universitaire.Repository.userRepository;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
public class SecurityController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final userRepository userRepository;

    @Value("${app.auth.token.key}")
    private String tokenKey;

    @Autowired
    public SecurityController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService,
            userRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authenticate(
            @RequestBody LoginModel login,
            HttpServletRequest request,
            @RequestHeader(value = "User-Agent", required = false) String userAgent) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.getMail(), login.getMot_de_passe()));
        } catch (BadCredentialsException e) {
            e.printStackTrace();
            var res = new ResponseModel();
            res.setMessage("Invalid Credentials")
                    .setStatus(HttpStatus.UNAUTHORIZED)
                    .setCode(HttpStatus.UNAUTHORIZED.value());
            return new ResponseEntity<>(res, res.getStatus());
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(login.getMail());
        var user = userRepository.findByMail(login.getMail()).orElseThrow(); // Assuming you have a method to find user
                                                                             // by email
        var date = new Date(System.currentTimeMillis());

        var roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        var token = JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuedAt(date)
                .withExpiresAt(new Date(System.currentTimeMillis() + (5 * 60 * 1000)))
                .withIssuer("fx-repo@" + request.getRemoteHost())
                .withClaim("roles", roles)
                .sign(Algorithm.HMAC256(tokenKey));

        HashMap<String, Object> resHash = new HashMap<>(2);
        resHash.put("token", token);
        resHash.put("id", user.getId());
        resHash.put("nom", user.getNom());
        resHash.put("prenom", user.getPrenom());
        resHash.put("imgUser", user.getImgUser());
        resHash.put("role", roles.get(0)); // Assuming single role

        var res = new ResponseObjModel();
        res.setData(resHash)
                .setCode(HttpStatus.OK.value())
                .setStatus(HttpStatus.OK)
                .setMessage("Authenticated Successfully");
        return new ResponseEntity<>(res, res.getStatus());
    }

    @PostMapping("/createAccount")
    public ResponseEntity<Object> createAccount(@RequestBody ResponseModel accountData) {
        if (accountData.getPassword().length() > 20 || accountData.getPassword().length() < 6) {
            var res = new ExceptionModel();
            res.setTimestamp(Timestamp.from(Instant.now()))
                    .setMessage("Password must be between 6 and 20 characters")
                    .setStatus(HttpStatus.BAD_REQUEST)
                    .setCode(HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(res, res.getStatus());
        }

        user newUser = new user();
        newUser.setMail(accountData.getUsername());
        newUser.setMot_de_passe(passwordEncoder.encode(accountData.getPassword()));
        // newUser.setRole("ROLE_USER");
        newUser.setNom(accountData.getNom());
        newUser.setRole(accountData.getRole());
        newUser.setPrenom(accountData.getPrenom());
        newUser.setIdentite(accountData.getIdentite());
        newUser.setImgUser(accountData.getImgUser());
        newUser.setGenre(accountData.getGenre());
        newUser.setTel(accountData.getTel());
        var savedUser = userRepository.save(newUser);
        HashMap<String, Object> resHash = new HashMap<>(4);
        resHash.put("id", savedUser.getId());
        resHash.put("email", savedUser.getMail());
        resHash.put("username", savedUser.getNom());
        resHash.put("roles", savedUser.getRole());
        resHash.put("prenom", savedUser.getPrenom());
        var res = new ResponseObjModel();
        res.setData(resHash)
                .setCode(HttpStatus.CREATED.value())
                .setStatus(HttpStatus.CREATED)
                .setMessage("Account Created");
        return new ResponseEntity<>(res, res.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<user> getUserById(@PathVariable long id) {
        user user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable long id, @RequestBody user userNew) {
        user oldUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun utilisateur existe par cette id : " + id));
        
        // Mettre à jour les autres attributs de l'utilisateur
        oldUser.setIdentite(userNew.getIdentite());
        oldUser.setNom(userNew.getNom());
        oldUser.setPrenom(userNew.getPrenom());
        oldUser.setGenre(userNew.getGenre());
        oldUser.setMail(userNew.getMail());
        oldUser.setTel(userNew.getTel());
        oldUser.setRole(userNew.getRole());
        
        // Vérifier si un nouveau mot de passe est fourni
        if (userNew.getMot_de_passe() != null) {
            // Encoder le nouveau mot de passe
            oldUser.setMot_de_passe(passwordEncoder.encode(userNew.getMot_de_passe()));
        }
        
        // Vérifier si une nouvelle image est fournie
        if (userNew.getImgUser() != null) {
            oldUser.setImgUser(userNew.getImgUser());
        }
        
        // Enregistrer les modifications dans la base de données
        user updatedUser = userRepository.save(oldUser);
        
        // Préparer la réponse
        HashMap<String, Object> resHash = new HashMap<>(4);
        resHash.put("id", updatedUser.getId());
        resHash.put("email", updatedUser.getMail());
        resHash.put("nom", updatedUser.getNom());
        resHash.put("prenom", updatedUser.getPrenom());
        resHash.put("role", updatedUser.getRole());
        resHash.put("imgUser", updatedUser.getImgUser());
        resHash.put("genre", updatedUser.getGenre());
        resHash.put("tel", updatedUser.getTel());
        
        // Ne pas inclure le mot de passe dans la réponse
        resHash.put("mot_de_passe", (updatedUser.getMot_de_passe()));
        
        var res = new ResponseObjModel();
        res.setData(resHash)
                .setCode(HttpStatus.OK.value())
                .setStatus(HttpStatus.OK)
                .setMessage("User updated successfully");
        return new ResponseEntity<>(res, res.getStatus());
    }
    
    



    @PutMapping("/reset/{email}")
    public ResponseEntity<Object> resetPassword(@PathVariable String email, @RequestBody String newPassword) {
        Optional<user> userOptional = userRepository.findByMail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Utilisateur non trouvé avec l'email : " + email);
        }

        user user = userOptional.get();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setMot_de_passe(encodedPassword);
        userRepository.save(user);

        return ResponseEntity.ok("Mot de passe réinitialisé avec succès pour l'utilisateur avec l'email : " + email);
    }
}