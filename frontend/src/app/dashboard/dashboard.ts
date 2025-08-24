import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router, private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
