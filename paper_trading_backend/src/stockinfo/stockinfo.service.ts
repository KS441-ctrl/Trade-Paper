import { Injectable } from '@nestjs/common';
import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()

@Injectable()
export class StockinfoService {
    constructor(){}
    async getStockSymbols(){
        return nseIndia.getAllStockSymbols()
    }

    async getDataBySymbol(symbol: string){
        try {
            let data = await nseIndia.getEquityDetails(symbol.slice(1));
            return data;
        } catch(err){
            return err;
        }
    }
}
