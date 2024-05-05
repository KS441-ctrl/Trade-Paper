import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signup } from 'src/signup/signupSchema';
import { JwtService } from '@nestjs/jwt';

// user {
//     _id: new ObjectId('66286b292d32778a9835ab9b'),
//     user_name: 'Krishna',
//     email: 'krishna@gmail.com',
//     password: '12345',
//     amount: 100000,
//     __v: 0
//   }

@Injectable()
export class LoginService {
    constructor(@InjectModel(Signup.name) private signupModel: Model<Signup>, private jwtService: JwtService){}
    async loginCheck(loginData:any){
        let user =  await this.signupModel.findOne({email : loginData.email, password : loginData.password}).exec();
        console.log("user", user);
        if(user){
            const payload = { username: user.user_name,   id: user._id, email: user?.email};
            console.log("jwt token", this.jwtService.sign(payload));
            
            return this.jwtService.sign(payload);
        }
        else{
            return null;
        }
    }

    async decodeToken(token:any){
        try {
            const decodedToken = this.jwtService.decode(token?.token);
            return decodedToken;
          } catch (error) {
            console.log('Error decoding token:', error);
            return null;
          }
    }

    async getFunds(id:any){
        try{
            let amount = await this.signupModel.findOne({_id: id.slice(1)}).exec()
            return amount
        } catch(err){
            console.log("error while getting funds", err)
        }
    }

    async updateFunds(id: any, amount: any) {
        try {
            const result = await this.signupModel.updateOne({ _id: id.slice(1) }, { $set: { amount: amount?.amount } });
            
            return result
        } catch (err) {
            console.log("Error while updating funds:", err);
            return { success: false, message: 'An error occurred while updating funds' };
        }
    }
}
