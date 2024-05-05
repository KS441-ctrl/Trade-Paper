import { Module } from '@nestjs/common';
import { StockinfoService } from './stockinfo.service';
import { StockinfoController } from './stockinfo.controller';

@Module({
  providers: [StockinfoService],
  controllers: [StockinfoController]
})
export class StockinfoModule {}
