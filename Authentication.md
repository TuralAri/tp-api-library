# Exercice

1) Créer une table utilisateur qui comprendra les logins et des utilisateurs
2) Créer une route /auth qui prendra en entrée un login + mot de passe et générera un token JWT simple
3) Mettre à jour tsoa.json pour mettre une possibilité d'ajout du token :
    - Objet "securityDefinition" avec une clef ("jwt" par exemple) et en valeur un objet contenant:
        - type : apiKey
        - in : Savoir si on le met en header, query ou autre...
        - name: Nom du champ du token
    - Ajout dans "routes" du champ "authenticationModule" avec notre middleware sécurité
4) Mise en place d'un middleware qui vérifie la présence d'un token signé correctement sur toutes les routes

# Exercice noté

1) Créer trois utilisateurs :
    - admin
    - gerant
    - utilisateur
2) Générer des tokens contenant des droits de lecture/création/modification/suppression pour les tables author/book/bookCopy
3) Gérer les droits d'accès suivants :
    - l'administrateur a tout les droits
    - le gérant peut :
        - tout lire
        - créer et modifier sur toutes les tables
        - supprimer uniquement sur la table d'exemplaire des livres "Book Copy"
    - l'utilisateur peut :
        - tout lire
        - créer un nouveau livre si l'auteur existe déjà mais pas de nouveau exemplaire