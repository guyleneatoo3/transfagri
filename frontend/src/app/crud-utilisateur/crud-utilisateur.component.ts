import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CRUDUtilisateurService } from '../service/crudutilisateur';
import { Utilisateur } from '../models/utilisateur.model';

// Déclaration du composant standalone
@Component({
  selector: 'app-crud-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule], // Modules nécessaires
  template: `
    <div class="container">
      <h2>Gestion des Utilisateurs</h2>

      <!-- Formulaire d'ajout/modification -->
      <form (ngSubmit)="saveUser()">
        <input type="text" [(ngModel)]="form.nom" name="nom" placeholder="Nom" required />
        <input type="email" [(ngModel)]="form.email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="form.motDePasse" name="motDePasse" placeholder="Mot de passe" required />
        <button type="submit">{{ form.id ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" (click)="resetForm()">Annuler</button>
      </form>

      <!-- Liste des utilisateurs -->
      <ul>
        <li *ngFor="let user of utilisateurs">
          {{ user.nom }} - {{ user.email }}
          <button (click)="editUser(user)">Modifier</button>
          <button (click)="deleteUser(user.id!)">Supprimer</button>
        </li>
      </ul>
    </div>
  `
})
export class CRUDUtilisateur implements OnInit {
  // Liste des utilisateurs affichés
  utilisateurs: Utilisateur[] = [];

  // Formulaire de saisie
  form: Utilisateur = this.initForm();

  // Injection du service
  constructor(private crudService: CRUDUtilisateurService) {}

  // Initialisation du composant
  ngOnInit(): void {
    // Abonnement à la liste des utilisateurs
    this.crudService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  // Initialise un formulaire vide
  initForm(): Utilisateur {
    return { nom: '', email: '', motDePasse: '' };
  }

  // Sauvegarde ou modifie un utilisateur
  saveUser(): void {
    if (this.form.id) {
      // Modification
      this.crudService.modifierUtilisateur(this.form);
    } else {
      // Ajout
      const { nom, email, motDePasse } = this.form;
      this.crudService.ajouterUtilisateur({ nom, email, motDePasse });
    }
    this.resetForm(); // Réinitialise le formulaire
  }

  // Prépare le formulaire pour modification
  editUser(user: Utilisateur): void {
    this.form = { ...user };
  }

  // Supprime un utilisateur
  deleteUser(id: number): void {
    this.crudService.supprimerUtilisateur(id);
    if (this.form.id === id) {
      this.resetForm(); // Réinitialise si l'utilisateur supprimé était en cours d'édition
    }
  }

  // Réinitialise le formulaire
  resetForm(): void {
    this.form = this.initForm();
  }
}