import { Component } from '@angular/core';
import { TradingServiceService } from '../trading-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private tradingService:TradingServiceService, private router: Router, private cdr: ChangeDetectorRef){}
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });


  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.tradingService.loginCheck(this.registerForm.value).subscribe(
        (res: any | null) => {
          console.log("Response from login", res);
          if (res) {
            this.tradingService.setlogin(res?.user);
            this.router.navigate(['/dashboard']).then(() => {
              this.cdr.detectChanges();
            });
          } else {
            alert("Incorrect Login Credentials");
            this.registerForm.reset();
          }
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {
      console.log("Invalid form");
      this.registerForm.markAllAsTouched();
      localStorage.clear();
    }
  }


  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }
}
