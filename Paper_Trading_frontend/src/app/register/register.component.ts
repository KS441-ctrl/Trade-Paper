import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TradingServiceService } from '../trading-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private tradingService:TradingServiceService){}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    apikey: new FormControl('', Validators.required)
  });

  onSubmit(event:Event){
    event.preventDefault();
    if (this.registerForm.valid) {
      try{
        this.tradingService.createUser(this.registerForm.value).subscribe((res)=>{
          console.log('Api Response',res)
          if(!res){
            alert("User already exists")
          } else{
          }
        })
      } catch(err){
        console.log("error in trading service", err)
      }
      
    } else {
      console.log("invalid");
      this.registerForm.markAllAsTouched();
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
