import { Test, TestingModule } from '@nestjs/testing';
import { StockinfoController } from './stockinfo.controller';

describe('StockinfoController', () => {
  let controller: StockinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockinfoController],
    }).compile();

    controller = module.get<StockinfoController>(StockinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
