import { Component } from '@angular/core';
import { CounsellorService } from '../../services/counsellor.service';
import { Router, RouterLink } from '@angular/router';
import { Counsellor } from '../../commom/counsellor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  counsellor: Counsellor = new Counsellor(0, '', '', '', '');

  constructor(
    private counsellorService: CounsellorService,
    private router: Router
  ) {}

  register() {
    this.counsellorService.register(this.counsellor).subscribe(
      (response) => {
        console.log('Registration Successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration Failed:', error);
      }
    );
  }
}
