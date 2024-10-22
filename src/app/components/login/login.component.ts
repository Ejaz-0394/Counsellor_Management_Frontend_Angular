import { Component } from '@angular/core';
import { CounsellorService } from '../../services/counsellor.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Counsellor } from '../../commom/counsellor';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDetails } from '../../commom/login-details';
import { AuthService } from '../../services/auth.service';
import { catchError, of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgIf } from '@angular/common';

interface LoginResponse {
  token: string; // Adjust this to match your actual response structure
  // Add any other fields you expect in the response
}

interface LoginError {
  // Define the structure of your error response if you have one
  message?: string;
  // Add other error properties if needed
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDetails: LoginDetails = new LoginDetails('', '');
  faSignInAlt = faSignInAlt; // Assign the icon to a variable
  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      // If the form is invalid, stop here and the fields will highlight
      return;
    } else {
      this.authService
        .login(this.loginDetails)
        .pipe(
          catchError((error: LoginError) => {
            console.error('Login Failed:', error.message || 'Unknown error');
            return of(null); // Return null or an observable to handle the error properly
          })
        )
        .subscribe((response: LoginResponse | null) => {
          if (response) {
            console.log('Login Successful:', response);
            this.authService.storeToken(response.token); // Store the token
            this.router.navigate(['/dashboard']); // Navigate to dashboard after login
          }
        });
    }
  }
}
