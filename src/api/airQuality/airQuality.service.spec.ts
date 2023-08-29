import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AirQualityService } from './airQuality.service';
import { AirQuality } from './entities/airQuality.entity';


describe('AirQualityService', () => {
  let service: AirQualityService;
  let model: Model<AirQuality>;

  const mockAirQualityService = {
    findMostPolluted: jest.fn(),
    getPollution:jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirQualityService,ConfigService,
      {
        provide : getModelToken(AirQuality.name),
        useValue: mockAirQualityService
      }],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    model = module.get<Model<AirQuality>>(getModelToken(AirQuality.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
