import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}
    @Post()
    async check(@Body() loginData: any){
        const user = await this.loginService.loginCheck(loginData);
        return {user}
    }

    @Post('data')
    async getUserData(@Body() token:any){
        const data = await this.loginService.decodeToken(token)
        return {data}
    }

    @Get('amount/:id')
    async getFunds(@Param('id') id:string){
        let amount = this.loginService.getFunds(id)
        return amount
    }

    @Put('amount/:id')
    async updateFunds(@Param('id') id:string, @Body() amount:any){
        let updatedamount =  this.loginService.updateFunds(id, amount)
        return updatedamount
    }
}
