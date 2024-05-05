import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { TradingServiceService } from '../trading-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
// import {stockList} from '../../assets/stockList'

@Component({
  selector: 'app-watchlist',
  standalone:true,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  imports:[MatButtonModule, CommonModule, MatDialogModule],
})
export class WatchlistComponent implements OnInit {
  symbolsList: any = [];
  filteredSymbolsList: any = [];

  constructor(private tradingService: TradingServiceService, public dialog: MatDialog) {}
  stocksList: any = [];
  selectedStock: any = {};
  selectedStockDetails: any = {};
  userData:any = {}

  ngOnInit() {
    this.tradingService.getWatchlist().subscribe(
      (res) => {
        this.symbolsList = res;
        this.filteredSymbolsList = res;
      },
    );
  }

  filterStock(event:any){
    console.log("filter stock");
    this.filteredSymbolsList = this.symbolsList.filter(
      (stock:any) => {
        return stock.toLowerCase().includes(event.target.value.toLowerCase());
      },
    );

  }


  async openDialog(enterAnimationDuration: string, exitAnimationDuration: string, event: any, stock: any): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    console.log("dialog open");

    try {
        const [stockDetails, decodedToken] = await Promise.all([
            this.tradingService.getStockDetails(stock).toPromise(),
            this.tradingService.decodeToken(this.tradingService.gettoken()).toPromise()
        ]);

        this.selectedStockDetails = stockDetails;
        console.log("token", this.tradingService.gettoken());
        
        if (decodedToken) {
            console.log("userdata", decodedToken); 
            this.userData = decodedToken;
        }

        this.setstock(stock);
        
        const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
            width: '50%',
            height: '50%',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { selectedStock: this.selectedStock, selectedStockDetails: this.selectedStockDetails, tradingService: this.tradingService, userData: this.userData },
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    } catch (error) {
        console.error('Error fetching stock details or decoding token:', error);
    }
}




  onNoClick(): void {
    this.dialog.closeAll();
  }
  setstock(stock:any): void {
    this.selectedStock = stock;
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  standalone: true,
  templateUrl: './dialog.html'
})
export class DialogAnimationsExampleDialog {
  selectedStock: any = {};
  selectedStockDetails: any = {};
  orderDetails: any = {};
  tradingService: TradingServiceService;
  userData: any = {}
  qty: number = 0;
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedStock = data.selectedStock;
    this.selectedStockDetails = data.selectedStockDetails;
    this.tradingService = data.tradingService;
    this.userData = data.userData;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  setstock(stock:any): void {
    this.selectedStock = stock;
  }

  async buyStock(): Promise<void> {
    console.log("userid", this.userData);
    let fund = await lastValueFrom(this.tradingService.getFunds(this.userData?.data?.id))

    if(fund?.amount <= this.selectedStockDetails?.priceInfo?.lastPrice * this.qty){
      alert("Margin is more than Funds")
      return;
    }
    
    this.orderDetails = {
      stock_name: this.selectedStock,
      price: this.selectedStockDetails?.priceInfo?.lastPrice,
      qty: this.qty,
      user_id: this.userData?.data?.id,
    }
    let data = await lastValueFrom(this.tradingService.buyStock(this.orderDetails))
    let updatefund = await lastValueFrom(this.tradingService.updateFunds(this.userData?.data?.id, fund?.amount - (this.selectedStockDetails?.priceInfo?.lastPrice * this.qty)))

    this.onNoClick();
  }

  onQtyChange(event: any): void {
    this.qty = event.target.value;
  }

}
