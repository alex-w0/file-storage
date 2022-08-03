import { Test, TestingModule } from '@nestjs/testing';
import { AWSClientService } from './aws-client.service';

describe('AWSClientService', () => {
  let service: AWSClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AWSClientService],
    }).compile();

    service = module.get<AWSClientService>(AWSClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
