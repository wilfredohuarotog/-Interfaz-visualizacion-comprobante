import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);
  private apiUrl = '/api-efact-ose/v1'; // Usando proxy para evitar CORS

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getXML(ticket: string, token: string): Observable<Blob> {
    const headers = this.getHeaders(token);
    return this.http.get(`${this.apiUrl}/xml/${ticket}`, {
      headers,
      responseType: 'blob'
    });
  }

  getCDR(ticket: string, token: string): Observable<Blob> {
    const headers = this.getHeaders(token);
    return this.http.get(`${this.apiUrl}/cdr/${ticket}`, {
      headers,
      responseType: 'blob'
    });
  }

  getPDF(ticket: string, token: string): Observable<Blob> {
    const headers = this.getHeaders(token);
    return this.http.get(`${this.apiUrl}/pdf/${ticket}`, {
      headers,
      responseType: 'blob'
    });
  }
}