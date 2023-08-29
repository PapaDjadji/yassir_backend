import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { AirQuality } from './entities/airQuality.entity';


describe('AirQualityService', () => {
  let service: AirQualityService;
  let model: Model<AirQuality>;

  const mockAirQualityService = {
    create: jest.fn(),
    airQualityByZone: jest.fn(),
    findMostPolluted: jest.fn(),
    getPollution: jest.fn()
  };

  const mockAirQuality = {
    "ts": "2023-08-29T00:00:00.000Z",
    "aqius": 127,
    "mainus": "p2",
    "aqicn": 64,
    "maincn": "p2"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirQualityService, ConfigService,
        {
          provide: getModelToken(AirQuality.name),
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
