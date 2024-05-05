import { Component, Inject, OnInit } from '@angular/core';
import { TradingServiceService } from '../trading-service.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-holdings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './holdings.component.html',
  styleUrl: './holdings.component.css'
})
export class HoldingsComponent implements OnInit {
    holdings: any = [];
    totalInvestment: number = 0;
    currentHoldings: any = [];
    currentInvestment: number = 0;
    isLoading: boolean = true;
    userData:any = {};
    constructor(private tradingService: TradingServiceService, public dialog: MatDialog) { }
    async ngOnInit(): Promise<void> {
      try {
        const userData = await lastValueFrom(this.tradingService.decodeToken(this.tradingService.gettoken()));
        console.log("userdata", userData);
        this.userData=userData
        const res = await lastValueFrom(this.tradingService.getHoldingStocks(userData?.data?.id));
        console.log("holdings",res);
        this.holdings = res;
        this.getCurrentHoldings();
      } catch (error) {
        console.error("Error fetching holding stocks:", error);
      }
    }

    async refetchHoldings(){
      const res = await lastValueFrom(this.tradingService.getHoldingStocks(this.userData?.data?.id));
      this.holdings = res;
    }

    getTotal(){
      this.totalInvestment = 0;
      for(let i = 0; i < this.holdings.length; i++){
        this.totalInvestment += this.holdings[i].price * this.holdings[i].qty;
      }
      return this.totalInvestment;
    }

    async getCurrentHoldings() {
      try {
        for (let i = 0; i < this.holdings.length; i++) {
          const res = await this.tradingService.getStockDetails(this.holdings[i]?.stock_name).toPromise();
          console.log("stock details", res);
          
          this.currentHoldings.push(res);
          this.currentInvestment += res?.priceInfo?.lastPrice * this.holdings[i].qty;
        }
      } catch (error) {
        console.error("Error fetching stock details:", error);
      } finally {
        this.isLoading = false;
      }
    }

    async openDialog(enterAnimationDuration: string, exitAnimationDuration: string, stock:any, stockId:any ,qty:any, ltp:any):Promise<void>{
      const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
        width: '50%',
        height: '50%',
        enterAnimationDuration,
        exitAnimationDuration,
        data:{stock_name: stock, tradingService: this.tradingService, qty:qty, ltp:ltp, userData:this.userData, stockId: stockId, refetchHoldings: this.refetchHoldings}
    });
    }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  standalone: true,
  templateUrl: './dialog.html'
})
export class DialogAnimationsExampleDialog {
  selected_stock:any
  tradingService:TradingServiceService
  qty:any
  ltp:any
  userData:any
  stockId:any
  refetchHoldings:any
  
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selected_stock = data?.stock_name
    this.tradingService = data?.tradingService
    this.qty= data?.qty
    this.ltp = data?.ltp
    this.userData = data?.userData
    this.stockId = data?.stockId
    this.refetchHoldings = data?.refetchHoldings
  }
  async sellStock():Promise<void>{
    let fund = await lastValueFrom(this.tradingService.getFunds(this.userData?.data?.id))
    console.log("funnds", fund);
    
    let sell = await lastValueFrom(this.tradingService.sellOrder(this.stockId, this.ltp))
    console.log("sell", sell);
    
    let updatefund = await lastValueFrom(this.tradingService.updateFunds(this.userData?.data?.id, fund?.amount + (this.ltp* this.qty)))
    console.log("updatedfunds", updatefund)
    this.refetchHoldings()
    this.onNoClick()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
