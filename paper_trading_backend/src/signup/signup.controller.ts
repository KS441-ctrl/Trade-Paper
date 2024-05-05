import { Body, Controller, Post} from '@nestjs/common';
import { SignupService } from './signup.service';
import { Signup } from './signupSchema';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

    @Post()
    async create(@Body() signupData: Signup){
        return this.signupService.createUser(signupData)
    }
}