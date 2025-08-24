import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login'; // URL API backend
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Connexion avec login et motDePasse
  login(credentials: { login: string; motDePasse: string }): Observable<any> {
    // Mode développement : simulation de connexion
    if (credentials.login === 'admin' && credentials.motDePasse === 'admin') {
      const mockResponse = { token: 'mock-token-123', user: { id: 1, name: 'Admin' } };
      localStorage.setItem('authToken', mockResponse.token);
      this.isLoggedInSubject.next(true);
      return of(mockResponse);
    }
    
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error('Échec de la connexion'));
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