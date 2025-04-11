package com.example.restaurant_universitaire.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class mailcontroller {

    @Autowired
    private JavaMailSender javaMailSender; // Injection de dépendance pour envoyer des e-mails

    private void sendMailAnnulation(String emailAddress) {
        // Créer le message d'annulation
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAddress);
        message.setSubject("Annulation de commande");
        message.setText("Cher fournisseur,\n\n"
                + "Nous vous informons que la commande a été annulée avec succès.\n\n"
                + "Cordialement,\n"
                + "Restaurant universitaire Moknine");

        // Envoyer l'e-mail
        javaMailSender.send(message);
    }

    @GetMapping("/sendMail")
    public void sendMail() {
        sendMailAnnulation("benyaagoubwejden@gmail.com");
    }
}
