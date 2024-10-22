import { Test, TestingModule } from '@nestjs/testing';
import { LeavesResolver } from './leaves.resolver';

describe('LeavesResolver', () => {
  let resolver: LeavesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeavesResolver],
    }).compile();

    resolver = module.get<LeavesResolver>(LeavesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
