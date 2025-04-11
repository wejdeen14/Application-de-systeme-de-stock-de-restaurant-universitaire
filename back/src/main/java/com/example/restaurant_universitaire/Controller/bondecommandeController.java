package com.example.restaurant_universitaire.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant_universitaire.DTO.bondeDTO;
import com.example.restaurant_universitaire.DTO.cmdNull;
import com.example.restaurant_universitaire.DTO.detailInfo;
import com.example.restaurant_universitaire.Model.ProduitStock;
import com.example.restaurant_universitaire.Model.bondecommande;
import com.example.restaurant_universitaire.Model.detailcomd;
import com.example.restaurant_universitaire.Model.fournisseur;
import com.example.restaurant_universitaire.Repository.bondcommandeRepository;
import com.example.restaurant_universitaire.Repository.detailcomdRepository;
import com.example.restaurant_universitaire.Repository.produitstockRepository;

@RequestMapping("cmd")
@CrossOrigin("*")
@RestController
public class bondecommandeController {

    @Autowired
    private bondcommandeRepository BondcommandeRepository;

    @Autowired
    private detailcomdRepository detailcomdRepository;
    @Autowired
    private produitstockRepository produitstockRepository;
    @Autowired
    private JavaMailSender javaMailSender; // Injection de dépendance pour envoyer des e-mails

    @GetMapping
    public List<bondeDTO> getListbonde() {
        List<bondecommande> bondes = BondcommandeRepository.findAll();
        return bondes.stream().map(this::mapToBondeDTO).collect(Collectors.toList());
    }

    private bondeDTO mapToBondeDTO(bondecommande bondecommande) {
        bondeDTO bondeDTO = new bondeDTO();
        bondeDTO.setId_cmd(bondecommande.getIdCmd());
        bondeDTO.setDate_cmd(bondecommande.getDate_cmd());
        // Vérifier si la bondeliv associée à la bonde n'est pas nulle avant
        // d'accéder à son ID
        if (bondecommande.getLivraisoncommande() != null && bondecommande.getLivraisoncommande().getIdLiv() != null) {
            bondeDTO.setId_liv(bondecommande.getLivraisoncommande().getIdLiv());
        } else {
            // Gérer le cas où la livraison est absente ou n'a pas d'ID associé
            bondeDTO.setId_liv(null); // ou toute autre logique appropriée selon vos besoins
        }

        // Récupérer les détails de commande associés à cette commande
        List<detailcomd> details = detailcomdRepository.findByBondecommande(bondecommande);

        // Créer une liste pour stocker les informations détaillées
        List<detailInfo> detailInfos = new ArrayList<>();

        // Parcourir les détails de commande et construire les informations détaillées
        for (detailcomd detailcomd : details) {
            detailInfo info = new detailInfo();
            info.setNomProd(detailcomd.getProduit().getNomProd());
            info.setCategorie(detailcomd.getProduit().getCategorie().getNomCategorie());
            info.setFournisseur(detailcomd.getProduit().getCategorie().getFournisseur().getNom_for());
            info.setMail_for(detailcomd.getProduit().getCategorie().getFournisseur().getMail_for());
            info.setTel_for(detailcomd.getProduit().getCategorie().getFournisseur().getTel_for());
            info.setQuantite(detailcomd.getQte());
            info.setUnite(detailcomd.getUnite());
            detailInfos.add(info);
        }

        // Mettre à jour l'objet bondeDTO avec les détails de commande sous forme de
        // liste
        bondeDTO.setDetailcomds(detailInfos);

        return bondeDTO;
    }

    @GetMapping("/mail/{id}")
    public String getMailforByidcmd(@PathVariable Long id) {
        // Trouver la bonde de commande par son identifiant
        bondecommande bonde = BondcommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bonde de commande non trouvée avec l'identifiant : " + id));

        // Récupérer les détails de commande associés à cette commande
        List<detailcomd> details = detailcomdRepository.findByBondecommande(bonde);

        // nous prenons le premier détail pour obtenir l'adresse e-mail du fournisseur
        if (!details.isEmpty()) {
            detailcomd premierDetail = details.get(0); // Prend le premier élément de la liste
            return premierDetail.getProduit().getCategorie().getFournisseur().getMail_for();
        } else {
            throw new ResourceNotFoundException("Aucun détail trouvé pour la commande avec l'identifiant : " + id);
        }
    }

    private void sendMailAnnulation(String emailAddress, @PathVariable Long id) {
        // Créer le message d'annulation
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAddress);
        message.setSubject("Annulation de commande Numéro" + id); // Inclure l'ID de la commande dans le sujet
        message.setText("Cher fournisseur,\n\n"
                + "Nous vous informons que la commande numéro " + id + " a été annulée .\n\n"
                + "Cordialement,\n"
                + "Restaurant universitaire Moknine");

        // Envoyer l'e-mail
        javaMailSender.send(message);
    }

    @GetMapping("/sendMailAnnulation/{id}")
    public void sendMail(@PathVariable Long id) {
        // Récupérer l'adresse e-mail du fournisseur associé à la commande spécifique
        String emailAddress = getMailforByidcmd(id);

        // Envoyer l'e-mail en incluant l'ID de la commande dans le sujet et le corps du
        // message
        sendMailAnnulation(emailAddress, id);
        deleteBondecommande(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<bondeDTO> getBondecommande(@PathVariable Long id) {
        bondecommande bonde = BondcommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bonde de commande non trouvée avec l'identifiant : " + id));
        bondeDTO bondeDTO = mapToBondeDTO(bonde);
        return ResponseEntity.ok(bondeDTO);
    }

    @PostMapping("/Ajoutcmd")
    public String add(@RequestBody bondeDTO bondeDTO) {

        // Création d'une nouvelle bondecommande
        bondecommande bonde = new bondecommande();
        bonde.setIdCmd(bondeDTO.getId_cmd()); // Définition de l'identifiant de la commande
        bonde.setDate_cmd(bondeDTO.getDate_cmd()); // Définition de la date de la commande

        // Enregistrement de la bondecommande
        bonde = BondcommandeRepository.save(bonde);

        // Récupération des détails de la commande
        List<detailInfo> detailInfos = bondeDTO.getDetailcomds();

        // Parcours des détails de la commande
        for (detailInfo info : detailInfos) {
            ProduitStock produit = produitstockRepository.findByNomProd(info.getNomProd());
            // Création d'un nouveau détail de commande
            detailcomd detailcomd = new detailcomd();
            detailcomd.setId_detail(info.getId_detail());
            detailcomd.setQte(info.getQuantite());
            detailcomd.setUnite(info.getUnite());
            detailcomd.setProduit(produit);

            detailcomd.setBondecommande(bonde);

            // Enregistrement du détail de commande
            detailcomdRepository.save(detailcomd);
        }
        return "Commande ajoutée avec succès";
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBondecommande(@PathVariable Long id) {
        bondecommande bonde = BondcommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Bonde de commande non trouvée avec l'identifiant : " + id));

        // Supprimer les détails de commande associés à cette commande
        List<detailcomd> details = detailcomdRepository.findByBondecommande(bonde);
        detailcomdRepository.deleteAll(details);

        // Supprimer la commande elle-même
        BondcommandeRepository.delete(bonde);

        return ResponseEntity.ok().build();
    }


    @GetMapping("/bondecommande-idLiv-null")
    public ResponseEntity<List<cmdNull>> getBondecommandeIdLivNull() {
        try {
            List<bondecommande> bondecommandesWithoutLivraison = BondcommandeRepository.findByLivraisoncommandeIsNull();
            List<cmdNull> bondeDTOs = bondecommandesWithoutLivraison.stream()
                    .map(this::mapToBondeDTOWithSupplier)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(bondeDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private cmdNull mapToBondeDTOWithSupplier(bondecommande bonde) {
        cmdNull cmdNull = new cmdNull();
        cmdNull.setId_cmd(bonde.getIdCmd());
        cmdNull.setDate_cmd(bonde.getDate_cmd());

        List<detailcomd> details = detailcomdRepository.findByBondecommande(bonde);
        if (!details.isEmpty()) {
            ProduitStock produit = details.get(0).getProduit();
            if (produit != null && produit.getCategorie() != null && produit.getCategorie().getFournisseur() != null) {
                fournisseur fournisseur = produit.getCategorie().getFournisseur();
                cmdNull.setId_for(fournisseur.getId_for());
                cmdNull.setNomFor(fournisseur.getNom_for());
                
            }
        }
        return cmdNull;
    }

}