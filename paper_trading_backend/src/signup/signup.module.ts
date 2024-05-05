import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { Signup, SignupSchema } from './signupSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forFeature([{name : Signup.name ,schema:SignupSchema}])],
    controllers:[SignupController],
    providers:[SignupService]
})
export class SignupModule {}
