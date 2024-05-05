import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router){}

  navigateToDashboard() : void{
    // event.preventDefault();
    // event.stopPropagation();
    console.log("dashboard");
    
    this.router.navigate(['/dashboard'])
  }
  ajayclick(){
    console.log("ajay clicked");
  }

  navigateToHoldings(){
    this.router.navigate(['/holdings'])
  }
  navigateToWatchlist(){
    this.router.navigate(['/watchlist'])
  }

  navigateToAccount(){
    this.router.navigate(['/account'])
  }
}
