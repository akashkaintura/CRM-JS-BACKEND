import { Test, TestingModule } from '@nestjs/testing';
import { PayrollResolver } from './payroll.resolver';

describe('PayrollResolver', () => {
  let resolver: PayrollResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollResolver],
    }).compile();

    resolver = module.get<PayrollResolver>(PayrollResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
