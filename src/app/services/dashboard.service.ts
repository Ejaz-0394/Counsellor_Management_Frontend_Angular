import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard'; // Update with your actual API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDashboardData(): Observable<any> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in headers

    return this.http.get<any>(this.apiUrl, { withCredentials: true }); // Include headers in the request
  }
}
