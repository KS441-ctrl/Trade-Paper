import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TradingServiceService } from '../trading-service.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  userData: any = {};
  constructor(private tradingService:TradingServiceService){}
  async ngOnInit(): Promise<void> {
    let data = await lastValueFrom(this.tradingService.decodeToken(this.tradingService.gettoken()))
    console.log("userdata", data);
    
    this.userData = data
  }
}
