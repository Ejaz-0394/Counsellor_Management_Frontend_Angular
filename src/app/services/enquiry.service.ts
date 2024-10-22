import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enquiry } from '../commom/enquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  private apiUrl = 'http://localhost:8080/api'; // Backend API

  constructor(private http: HttpClient, private authService: AuthService) {}

  addEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in headers

    return this.http.post<Enquiry>(`${this.apiUrl}/add`, enquiry, {
      withCredentials: true,
    });
  }

  getEnquiries(): Observable<Enquiry[]> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in headers

    return this.http.get<Enquiry[]>(`${this.apiUrl}/getall`, {
      withCredentials: true,
    });
  }

  updateEnquiry(enquiry: Enquiry) {
    return this.http.put(
      `http://localhost:8080/api/enquiries/${enquiry.eId}`,
      enquiry
    ); // Use the ID in the URL
  }
}
