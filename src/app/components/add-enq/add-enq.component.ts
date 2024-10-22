import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enquiry } from '../../commom/enquiry';
import { Router, RouterLink } from '@angular/router';
import { EnquiryService } from '../../services/enquiry.service';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from '../../icons';

@Component({
  selector: 'app-add-enq',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './add-enq.component.html',
  styleUrl: './add-enq.component.css',
})
export class AddEnqComponent {
  enquiry: Enquiry = new Enquiry('', '', '', '', ''); // Bind Enquiry model to the form
  icons = icons;
  constructor(
    private enquiryService: EnquiryService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Method to handle form submission
  onSubmit(): void {
    if (this.enquiry.eId) {
      // Assuming the Enquiry class has an `id` field to identify it
      this.enquiryService.updateEnquiry(this.enquiry).subscribe({
        next: (response) => {
          console.log('Enquiry updated successfully:', response);
          this.router.navigate(['/viewenq']); // Navigate back to the view enquiries page
        },
        error: (error) => {
          console.error('Error updating enquiry:', error);
        },
      });
    } else {
      this.enquiryService.addEnquiry(this.enquiry).subscribe({
        next: (response) => {
          console.log('Enquiry added successfully:', response);
          this.enquiry = new Enquiry('', '', '', '', ''); // Resetting the form fields
          this.router.navigate(['/viewenq']); // Redirect to enquiry list or dashboard
        },
        error: (error) => {
          console.error('Error adding enquiry:', error);
        },
      });
    }

    // this.enquiryService.addEnquiry(this.enquiry).subscribe({
    //   next: (response) => {
    //     console.log('Enquiry added successfully:', response);
    //     // After successful addition, navigate to another page or show a message
    //     this.enquiry = new Enquiry('', '', '', '', ''); // Resetting the form fields
    //     this.router.navigate(['/add-inquiry']); // Redirect to enquiry list or dashboard
    //     // this.enquiryForm.reset();
    //   },
    //   error: (error) => {
    //     console.error('Error adding enquiry:', error);
    //   },
    // });
  }

  logout() {
    this.authService.logout(); // Clear the token from local storage
    this.router.navigate(['/login']);
  }
}
