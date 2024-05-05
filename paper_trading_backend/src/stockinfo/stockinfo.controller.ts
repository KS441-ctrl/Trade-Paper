import { Controller, Get, Param} from '@nestjs/common';
import { StockinfoService } from './stockinfo.service';

@Controller('stockinfo')
export class StockinfoController {
    constructor(private stockinfoservice: StockinfoService) {}

    @Get('symbols')
    async getStockSymbols(){
        return this.stockinfoservice.getStockSymbols();
    }

    @Get('details/:symbol')
    async getStockDetails(@Param('symbol') symbol: string){
        return this.stockinfoservice.getDataBySymbol(symbol)
    }
}
