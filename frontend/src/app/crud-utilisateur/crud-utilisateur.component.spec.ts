// Importe les outils de test Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importe le composant standalone à tester
import { CRUDUtilisateur } from './crud-utilisateur.component';

// Déclare le bloc de test pour le composant CRUDUtilisateur
describe('CRUDUtilisateur', () => {
  // Déclare une variable pour l'instance du composant
  let component: CRUDUtilisateur;

  // Déclare une variable pour le conteneur de test du composant
  let fixture: ComponentFixture<CRUDUtilisateur>;

  // Avant chaque test, configure l'environnement de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Comme le composant est standalone, on l'importe directement ici
      imports: [CRUDUtilisateur]
    })
    .compileComponents(); // Compile les composants et leurs templates

    // Crée une instance du composant dans le conteneur de test
    fixture = TestBed.createComponent(CRUDUtilisateur);

    // Récupère l'instance du composant
    component = fixture.componentInstance;

    // Déclenche la détection des changements (initialisation du template)
    fixture.detectChanges();
  });

  // Test simple : vérifie que le composant est bien créé
  it('should create', () => {
    expect(component).toBeTruthy(); // Le composant doit exister
  });
});