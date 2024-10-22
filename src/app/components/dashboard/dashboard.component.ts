import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  faPlusCircle,
  faSignOut,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterModule, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalEnquiries: number = 0;
  openEnquiries: number = 0;
  enrolledEnquiries: number = 0;
  lostEnquiries: number = 0;
  name: String = '';
  faPlusCircle = faPlusCircle;
  faSignOut = faSignOut;
  faEye = faEye;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      (data) => {
        this.totalEnquiries = data.totalEnquiries;
        this.openEnquiries = data.openEnquiries;
        this.enrolledEnquiries = data.enrolledEnquiries;
        this.lostEnquiries = data.lostEnquiries;
      },
      (error) => {
        console.error('Error loading dashboard data', error);
      }
    );
  }
  logout() {
    this.authService.logout(); // Clear the token from local storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
