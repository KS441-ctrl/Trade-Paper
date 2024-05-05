import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from 'src/signup/signupSchema';
import { JwtModule } from '@nestjs/jwt';
import * as crypto from 'crypto';





@Module({
  imports:[MongooseModule.forFeature([{name : Signup.name ,schema:SignupSchema}]), JwtModule.registerAsync({
    useFactory: () => ({
        secret: crypto.randomBytes(32).toString('hex'),
        signOptions: { expiresIn:'30d'},
      }),
  })],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {

}
