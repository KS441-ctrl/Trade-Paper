import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './orderSchema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createOrder(orderData: Order) {
        try {
            const createdOrder = new this.orderModel(orderData);
            return createdOrder.save();
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async getOrders(user_id: any) {
        try {
            let orders = await this.orderModel.find({ user_id: user_id.slice(1), is_sold: false }).exec();
            return orders;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateOrder(order_id:any, orderData:any){
        try{
            let update = await this.orderModel.updateOne({_id: order_id.slice(1)}, {$set:{is_sold: true, sell_price: orderData.soldPrice}})
            return update
        } catch(err){
            console.log("error while updating the order", orderData);
            
        }
    }
}
