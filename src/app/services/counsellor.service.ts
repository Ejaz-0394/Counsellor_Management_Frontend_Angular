import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counsellor } from '../commom/counsellor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounsellorService {
  private apiUrl = 'http://localhost:8080/api/register';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = { email, password };

    return this.http
      .post('http://localhost:8080/api/login', loginData, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log('Login successful');
          // Redirect to dashboard or save any necessary state
        },
        (error) => {
          console.log('Login failed');
        }
      );
  }

  register(counsellor: Counsellor): Observable<any> {
    return this.http.post<any>(this.apiUrl, counsellor);
  }
}
