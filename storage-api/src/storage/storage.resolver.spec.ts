import { Test, TestingModule } from '@nestjs/testing';
import { StorageResolver } from './storage.resolver';

describe('StorageResolver', () => {
  let resolver: StorageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageResolver],
    }).compile();

    resolver = module.get<StorageResolver>(StorageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
