import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDetails } from '../commom/login-details';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, loginDetails, {
      withCredentials: true,
    });
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Optionally, you can add a method to retrieve the token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Optionally, you can add a method to clear the token on logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
