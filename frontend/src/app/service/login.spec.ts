// Importe l'outil de test principal d'Angular
import { TestBed } from '@angular/core/testing';

// Importe le service Login à tester
import { LoginService } from './login';

// Début du bloc de test pour le service Login
describe('Login', () => {
  // Déclaration d'une variable pour stocker l'instance du service
  let service: LoginService;

  // Ce bloc s'exécute avant chaque test
  beforeEach(() => {
    // Configuration du module de test Angular (vide ici, à compléter si nécessaire)
    TestBed.configureTestingModule({});
    
    // Injection du service Login dans le contexte de test
    service = TestBed.inject(LoginService);
  });

  // Test unitaire simple : vérifie que le service a bien été créé
  it('should be created', () => {
    // Vérifie que l'instance du service existe (n'est pas null ou undefined)
    expect(service).toBeTruthy();
  });
});