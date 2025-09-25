import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Dashboard } from './dashboard/dashboard';
import { DashboardEmfComponent } from './dashboard/dashboard-emf';
import { DashboardCnefComponent } from './dashboard/dashboard-cnef';
import { DashboardAdminComponent } from './dashboard/dashboard-admin';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs';
import { GestionIndicateursComponent } from './gestion-indicateurs/gestion-indicateurs';
import { UploadComponent } from './formation/upload';

import { HaccueilComponent } from './haccueil/haccueil';
import { ContactComponent } from './contact/contact';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from './service/login';

import { AproposComponent } from './apropos/apropos';
import { GererActiviteComponent } from './gerer-activite/gerer-activite';

// Guarde d'authentification pour dashboard
export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const loginService = inject(LoginService);
    if (loginService.isAuthenticated()) {
      return true;
    } else {
      window.location.href = '/login';
      return false;
    }
  } else {
    // SSR: ne jamais bloquer côté serveur, laisser le client router
    return true;
  }
};

export const routes: Routes = [
  { path: '', component: HaccueilComponent }, // Page d'accueil par défaut
  { path: 'accueil', component: HaccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'activites', component: GererActiviteComponent },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: 'utilisateurs', component: GestionUtilisateursComponent },
      { path: 'indicateurs', component: GestionIndicateursComponent },
      { path: 'formation', component: UploadComponent },
    ]
  },
  {
    path: 'dashboard/emf',
    component: DashboardEmfComponent,
    canActivate: [authGuard],
    children: [
      // Ajoute ici les composants enfants spécifiques EMF si besoin
    ]
  },
  {
    path: 'dashboard/cnef',
    component: DashboardCnefComponent,
    canActivate: [authGuard],
    children: [
      // Ajoute ici les composants enfants spécifiques CNEF si besoin
    ]
  },
  {
    path: 'dashboard/admin',
    component: DashboardAdminComponent,
    canActivate: [authGuard],
    children: [
      // Ajoute ici les composants enfants spécifiques Admin si besoin
    ]
  },
  { path: '**', redirectTo: '' } // Redirection vers l'accueil pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }