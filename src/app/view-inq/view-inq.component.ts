import { Component } from '@angular/core';
import { EnquiryService } from '../services/enquiry.service';
import { Router, RouterLink } from '@angular/router';
import { Enquiry } from '../commom/enquiry';
import { NgFor } from '@angular/common';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEnqComponent } from '../components/add-enq/add-enq.component';
import { FormsModule } from '@angular/forms';
import { icons } from '../icons';

@Component({
  selector: 'app-view-inq',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, RouterLink, FormsModule],
  templateUrl: './view-inq.component.html',
  styleUrl: './view-inq.component.css',
})
export class ViewInqComponent {
  enquiries: Enquiry[] = [];
  faHome = faHome;
  icons = icons;
  searchTerm: string = '';

  constructor(private enquiryService: EnquiryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEnquiries();
  }

  fetchEnquiries(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => {
        this.enquiries = data;
      },
      error: (error) => {
        console.error('Error fetching enquiries:', error);
      },
    });
  }

  editEnquiry(enquiry: Enquiry): void {
    this.router.navigate(['/add-inquiry'], { state: { enquiry } });
  }

  // Function to filter enquiries based on search term
  filteredEnquiries(): Enquiry[] {
    if (!this.searchTerm) {
      return this.enquiries; // Return full list if no search term
    }

    const lowerSearchTerm = this.searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive search
    return this.enquiries.filter(
      (enquiry) =>
        enquiry.studentName.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.studentPhno.includes(lowerSearchTerm) ||
        enquiry.courseName.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.classMode.toLowerCase().includes(lowerSearchTerm) ||
        enquiry.enqStatus.toLowerCase().includes(lowerSearchTerm)
    );
  }

  logout() {}
}
