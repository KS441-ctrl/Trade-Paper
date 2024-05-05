import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TradingServiceService } from './trading-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, RegisterComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Stock_Simulator';
  isLoggedIn: boolean = false
  constructor(private tradingService: TradingServiceService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.tradingService.checkIfLoggedIn();
  }
}
