// Importe les éléments nécessaires d'Angular
import { Component } from '@angular/core';

// Importe le service de connexion
import { LoginService } from '../service/login';

// Importe des modules communs d'Angular
import { CommonModule } from '@angular/common';

// Importe les modules de formulaire réactif
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Déclare le composant comme standalone avec ses métadonnées
@Component({
  selector: 'app-login', // Nom du composant utilisé dans le HTML
  standalone: true, // ✅ Composant standalone
  imports: [CommonModule, ReactiveFormsModule], // ✅ Modules nécessaires pour le template
  templateUrl: './login.component.html', // Fichier HTML associé
  styleUrls: ['./login.component.css'] // Fichier CSS associé
})
export class LoginComponent {
  // Déclaration du formulaire de connexion
  loginForm: FormGroup;

  // Message d'erreur affiché en cas d'échec de connexion
  errorMessage: string = '';

  // Constructeur avec injection du FormBuilder et du service LoginService
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // Initialisation du formulaire avec deux champs requis : login et motDePasse
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    // Vérifie si le formulaire est valide
    if (this.loginForm.valid) {
      // Appelle le service de login avec les données du formulaire
      this.loginService.login(this.loginForm.value).subscribe({
        // En cas de succès
        next: (response) => {
          console.log('Connexion réussie !', response);
          // Tu peux ajouter ici une redirection ou autre logique
        },
        // En cas d'erreur
        error: (error) => {
          console.error('Erreur de connexion', error);
          this.errorMessage = 'Login ou mot de passe incorrect.';
        }
      });
    }
  }
}