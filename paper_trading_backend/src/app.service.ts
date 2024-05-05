import { Injectable } from '@nestjs/common';
import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()

@Injectable()
export class AppService {
  getHello() {
    return nseIndia.getAllStockSymbols()
  }
}
