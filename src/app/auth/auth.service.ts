import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://overnightjs-auth.onrender.com/auth'; // Backend API URL

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username); // Save username
        }
      })
    );
  }
  

  signup(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    // Implement token-based authentication
    return !!localStorage.getItem('token');
  }
}
