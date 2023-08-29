import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AirQualityController } from './airQuality.controller';
import { AirQualityService } from './airQuality.service';
import { AirQuality } from './entities/airQuality.entity';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let model: Model<AirQuality>;

  const mockAirQualityService = {
    create: jest.fn(),
    findOne: jest.fn(),
    getDateTime: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [AirQualityService,ConfigService,
        {
          provide: getModelToken(AirQuality.name),
          useValue: mockAirQualityService
        }],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    model = module.get<Model<AirQuality>>(getModelToken(AirQuality.name));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
