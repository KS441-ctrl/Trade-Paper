import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
export type SignupDocument = HydratedDocument<Signup>;
@Schema()
export class Signup{
    @Prop({required:true})
    user_name: string;

    @Prop({required:true})
    email: string;

    @Prop({required:true})
    password:string;

    @Prop({required:true, default:100000})
    amount: number

    @Prop({required:true, default:"UGBXPHIPL52V9IMM."})
    api_key: string
}

export const SignupSchema = SchemaFactory.createForClass(Signup);