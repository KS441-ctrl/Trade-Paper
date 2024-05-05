import { Injectable } from '@nestjs/common';
import { Signup, SignupDocument } from './signupSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SignupService {
  constructor(@InjectModel(Signup.name) private signupModel: Model<Signup>){

  }

  async createUser(signupData:any){
    console.log("signupData", signupData);
    let transformedData = {
      user_name : signupData.username,
      email: signupData.email,
      password: signupData.password,
      api_key: signupData.apikey
    }
    const existingUser = await this.signupModel.findOne({ email: signupData.email });
    if(existingUser){
      return null;
    }
    const createdSignup = new this.signupModel(transformedData);
    return createdSignup.save();
  }
}