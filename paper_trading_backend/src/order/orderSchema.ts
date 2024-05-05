import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order{
    @Prop({required:true})
    user_id: string;

    @Prop({required:true})
    stock_name: string;

    @Prop({required:true})
    qty: number;

    @Prop({required:true})
    price: number;

    @Prop({required:true, default: Date.now})
    date: Date;

    @Prop({default:0})
    sell_price: number;

    @Prop({required:true, default:false})
    is_sold: boolean;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

