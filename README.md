# 🍽️ Application de Gestion de Stock - Restaurant Universitaire 

Cette application web permet de gérer de manière efficace et automatisée les opérations liées au stock d’un restaurant universitaire. Développée avec **Spring Boot** pour le back-end, **React** pour le front-end et **WebSocket** pour les notifications en temps réel, cette solution offre une gestion complète des stocks, une planification des menus, le calcul des coûts des repas, ainsi que des fonctionnalités avancées pour un suivi optimisé.

La présentation visuelle du projet est disponible sur **[Canva](https://www.canva.com/design/DAGG03vIyAk/lLd7kJMBxw1OqWZm9TM38A/edit?utm_content=DAGG03vIyAk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**.

---

## ⚙️ Fonctionnalités

### **Gestion de Stock**
- 🥦 **Mouvements de stock** : Gérer les entrées et sorties des produits alimentaires et des fournitures. 
- 📊 **Suivi en temps réel** : Suivi dynamique du niveau des stocks avec alertes lorsque le stock atteint des niveaux critiques.
- 🧾 **Historique des mouvements** : Consultation de l'historique complet des changements de stock.

### **Planification des Menus**
- 📅 **Création et gestion des menus** : Planifier et mettre à jour les menus du restaurant universitaire, avec la possibilité de gérer les ingrédients nécessaires pour chaque plat.

### **Calcul des Coûts des Repas**
- 💰 **Calcul automatisé** des coûts par repas basé sur les ingrédients et leurs prix de vente.
- 🔢 **Estimation des profits** : Visualiser l'impact des choix de menu sur le budget et les marges bénéficiaires.

### **Notifications et Alertes**
- 📧 **Envoi de mails via SMTP** : En cas d'annulation de commande ou d'autres actions critiques, un email est envoyé à l'administrateur ou à l'utilisateur concerné pour les informer des modifications effectuées. Le système utilise **SMTP** (Simple Mail Transfer Protocol) pour l'envoi des notifications par email.
- 🔔 **Alertes en temps réel** : Notifications instantanées pour les niveaux de stock faibles, les changements dans les menus, ou lorsque de nouveaux produits arrivent. **WebSocket** est utilisé pour assurer ces notifications en temps réel.

### **Gestion des Utilisateurs et Administration**
- 👥 **Gestion des utilisateurs** : Le système prend en charge la gestion des utilisateurs (administrateurs, gestionnaires de stock, personnel) avec des rôles et permissions.
- 🖥️ **Partie Admin** : Interface administrateur permettant de gérer l'ensemble des utilisateurs, de configurer les rôles, et d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur les produits, les menus, et les mouvements de stock.
- 🔒 **Authentification et Sécurité** : Sécurisation de l'application avec des fonctionnalités de connexion et d'authentification via **JWT** pour un accès sécurisé aux fonctionnalités administratives.

### **Visualisations et Statistiques**
- 📊 **Graphiques interactifs** : Visualiser les tendances de stock, les performances des menus, et les coûts avec des graphiques et des rapports détaillés pour une prise de décision optimisée.

---

## 🛠️ Technologies

- **Back-end** : Java, Spring Boot, Spring Security, Spring Data JPA, REST API, WebSocket,SMTP
- **Front-end** : React, Axios, Bootstrap / Tailwind,chartjs 
- **Base de données** : MySQL
- **Outils** : Git, GitHub, Postman
- **Sécurité** : JWT (JSON Web Tokens) pour l'authentification
- **Communication en temps réel** : WebSocket pour la gestion des notifications

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/wejdeen14/Application-de-systeme-de-stock-de-restaurant-universitaire.git
cd Application-de-systeme-de-stock-de-restaurant-universitaire
