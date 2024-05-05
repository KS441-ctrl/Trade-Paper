import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderservice: OrderService) { }
    @Post()
    async createOrder(@Body() orderData: any) {
        return this.orderservice.createOrder(orderData);
    }

    @Get(':user_id')
    async getOrders(@Param('user_id') user_id: string) {{
        return this.orderservice.getOrders(user_id);
    }}

    @Put(':order_id')
    async updateOrder(@Param('order_id') order_id: string, @Body() orderData:any){
        
        return this.orderservice.updateOrder(order_id, orderData);
    }
    
}
