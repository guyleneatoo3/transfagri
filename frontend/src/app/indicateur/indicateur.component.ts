// Importe les éléments nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Nécessaire pour les directives *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // ✅ Nécessaire pour [(ngModel)]

// Importe le modèle Indicateur
import { Indicateur } from '../models/indicateur.model';

// Importe le service de gestion des indicateurs
import { IndicateurService } from '../service/indicateur';

@Component({
  selector: 'app-crud-indicateur', // Nom du composant utilisé dans le HTML
  standalone: true,                // ✅ Déclaration comme composant standalone
  imports: [CommonModule, FormsModule], // ✅ Modules nécessaires pour le template
  templateUrl: 'indicateur.component.html', // Fichier HTML associé
  styleUrls: ['./indicateur.component.css']   // Fichier CSS associé
})
export class CrudIndicateurComponent implements OnInit {
  // Liste des indicateurs affichés
  indicateurs: Indicateur[] = [];

  // Indicateur sélectionné pour ajout ou modification
  selectedIndicateur: Indicateur = this.resetIndicateur();

  // Terme de recherche saisi par l'utilisateur
  searchTerm: string = '';

  // Injection du service dans le constructeur
  constructor(private indicateurService: IndicateurService) {}

  // Initialisation du composant : chargement des indicateurs
  ngOnInit(): void {
    this.loadIndicateurs();
  }

  // 🔄 Réinitialise le formulaire avec un indicateur vide
  resetIndicateur(): Indicateur {
    return {
      libelle: undefined,
      objectif: undefined,
      type: undefined,
      seuilAttendu: undefined,
      uniteMesure: undefined
    };
  }

  // 📥 Charge tous les indicateurs depuis le service
  loadIndicateurs(): void {
    this.indicateurService.getIndicateurs().subscribe(data => {
      this.indicateurs = data;
    });
  }

  // ➕ Ajoute un nouvel indicateur ou met à jour un existant
  saveIndicateur(): void {
    if (this.selectedIndicateur.id) {
      // 🔄 Mise à jour
      this.indicateurService.updateIndicateur(this.selectedIndicateur).subscribe(() => {
        this.loadIndicateurs();
        this.selectedIndicateur = this.resetIndicateur();
      });
    } else {
      // ➕ Ajout
      this.indicateurService.addIndicateur(this.selectedIndicateur).subscribe(() => {
        this.loadIndicateurs();
        this.selectedIndicateur = this.resetIndicateur();
      });
    }
  }

  // 🖊️ Prépare le formulaire pour modifier un indicateur existant
  editIndicateur(indicateur: Indicateur): void {
    this.selectedIndicateur = { ...indicateur }; // Copie pour éviter les effets de bord
  }

  // ❌ Supprime un indicateur par son ID
  deleteIndicateur(id: number): void {
    this.indicateurService.deleteIndicateur(id).subscribe(() => {
      this.loadIndicateurs();
    });
  }

  // 🔍 Recherche les indicateurs par libellé
  searchIndicateurs(): void {
    if (this.searchTerm.trim()) {
      this.indicateurService.searchIndicateurs(this.searchTerm).subscribe(data => {
        this.indicateurs = data;
      });
    } else {
      this.loadIndicateurs(); // Recharge tous si la recherche est vide
    }
  }
}

export { Indicateur };
