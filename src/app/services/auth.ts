import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api-efact-ose'; // Usando proxy para evitar CORS
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  login(username: string, password: string): Observable<TokenResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      grant_type: 'password',
      username: username,
      password: password
    });

    console.log('Intentando login con:', { username, url: `${this.apiUrl}/oauth/token` });

    return this.http.post<TokenResponse>(
      `${this.apiUrl}/oauth/token`, 
      body.toString(), 
      { headers }
    ).pipe(
      tap({
        next: (response) => {
          console.log('Login exitoso, token recibido');
          this.tokenSubject.next(response.access_token);
          sessionStorage.setItem('access_token', response.access_token);
        },
        error: (error) => {
          console.error('Error en login:', error);
        }
      })
    );
  }

  logout(): void {
    this.tokenSubject.next(null);
    sessionStorage.removeItem('access_token');
  }

  getToken(): string | null {
    return this.tokenSubject.value || sessionStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}