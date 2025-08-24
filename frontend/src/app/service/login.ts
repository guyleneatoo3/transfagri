import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://example.com/api/login'; // 🔁 À remplacer par ton URL réelle
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Connexion avec login et motDePasse
  login(credentials: { login: string; motDePasse: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}