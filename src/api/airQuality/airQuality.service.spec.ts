import { HttpModule, HttpService, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppModule } from '../../app.module';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { AirQuality } from './entities/airQuality.entity';


describe('AirQualityService', () => {
  let service: AirQualityService;
  let model: Model<AirQuality>;
  let app: INestApplication;
  let httpService: HttpService;

  const mockAirQualityService = {
    create: jest.fn(),
    getPollution: jest.fn(),
    airQualityByZone: jest.fn(),
    findMostPolluted: jest.fn()
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [AirQualityService, ConfigService,
        {
          provide: getModelToken(AirQuality.name),
          useValue: mockAirQualityService
        }],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    model = module.get<Model<AirQuality>>(getModelToken(AirQuality.name));

    app = module.createNestApplication();
    httpService =module.get<HttpService>(HttpService);
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
