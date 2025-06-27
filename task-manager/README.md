# Gestionnaire de Tâches

## Informations

- **Projet**: Gestionnaire de Tâches avec React, Vite et Lightning CSS
- **Auteur**: Ugo RASTELL

## Description

Cette application permet la gestion de tâches, organisées par catégorie (Travail, Personnel, Urgent). L'utilisateur peut ajouter, modifier et supprimer des tâches, ainsi que filtrer et trier ses tâches selon différents critères.

L'ensemble du style est géré à l'aide de Lightning CSS, en tirant parti de ses fonctionnalités:
- Nesting (styles imbriqués)
- Autoprefixing (préfixes ajoutés automatiquement)
- Minification (CSS optimisé en build)

## Instructions pour lancer l'application

### Prérequis
- Node.js
- npm 

### Installation et démarrage

1. Cloner le dépôt
```bash
git clone https://github.com/UgoRastell/gestionnaire.git
cd task-manager
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur de développement
```bash
npm run dev
```

4. Construire pour la production
```bash
npm run build
```

5. Prévisualiser la version de production
```bash
npm run preview
```

## Fonctionnalités implémentées

### Fonctionnalités principales
- ✅ Ajout de tâches avec description et catégorie
- ✅ Modification de tâches existantes
- ✅ Suppression de tâches
- ✅ Organisation par catégories (Travail, Personnel, Urgent)
- ✅ Interface responsive (mobile, tablette, desktop)

### Bonus implémentés
- ✅ Ajout d'une date limite pour chaque tâche
- ✅ Tri des tâches par date limite
- ✅ Message clair si aucune tâche n'est présente
- ✅ Système de filtrage par catégorie
- ✅ Persistance des données via localStorage
- ✅ Marquage des tâches comme terminées

## Détails techniques

### Structure du projet
- `src/components/TaskForm.jsx`: Formulaire d'ajout/modification de tâches
- `src/components/TaskList.jsx`: Affichage et gestion des tâches
- `src/App.jsx`: Composant principal avec gestion d'état

### Technologies utilisées
- React (hooks pour la gestion d'état)
- Vite (outil de bundling)
- Lightning CSS (styles avec nesting et autoprefixing)
- LocalStorage (persistance des données)
