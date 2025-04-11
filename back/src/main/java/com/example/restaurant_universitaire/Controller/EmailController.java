package com.example.restaurant_universitaire.Controller;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.restaurant_universitaire.Model.user;
import com.example.restaurant_universitaire.Repository.userRepository;

@RequestMapping("/api")
@Controller
public class EmailController {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private userRepository userRepository;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            Pattern.CASE_INSENSITIVE);

    @PostMapping("/sendCode")
    @ResponseBody
    public ResponseEntity<String> sendCode(@RequestBody String email) {
        // Supprimer les espaces blancs et les caractères spéciaux de la chaîne email
        email = email.trim(); // Supprimer les espaces blancs au début et à la fin de la chaîne

        // Vérifier si l'adresse e-mail est valide
        if (!isValidEmail(email)) {
            return ResponseEntity.badRequest().body("Invalid email address: " + email);
        }

        // Générer un code aléatoire
        String code = generateCode(6);
        sendEmail(email, code);
        return ResponseEntity.ok(code);
    }

    private String generateCode(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }

    private void sendEmail(String email, String code) {
        try {
            // Create the email message
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Réinitialisation de mot de passe");
            message.setText("Bonjour,\n\n"
                    + "Vous avez demandé une réinitialisation de mot de passe. Veuillez utiliser le code suivant :\n\n"
                    + code + "\n\n"
                    + "Cordialement,\n"
                    + "Restaurant universitaire Moknine");

            emailSender.send(message);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private boolean isValidEmail(String email) {
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.find();
    }

    @GetMapping("/email/{id}")
    public ResponseEntity<String> getUserEmailById(@PathVariable long id) {
        // Find the user by ID
        user user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Get the user's email address
        String email = user.getMail();

        // Return the email address in the response
        return ResponseEntity.ok(email);
    }




   

}
