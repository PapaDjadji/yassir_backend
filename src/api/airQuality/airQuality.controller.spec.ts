import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AirQualityController } from './airQuality.controller';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { AirQuality } from './entities/airQuality.entity';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let model: Model<AirQuality>;

  const mockAirQualityService = {
    create: jest.fn(),
    findAirQualityByZone: jest.fn(),
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
      controllers: [AirQualityController],
      providers: [AirQualityService, ConfigService,
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


  describe('create', () => {
    it('should create and return a AirQuality', async () => {
      const newAirQuality = {
        "ts": "2023-08-29T00:00:00.000Z",
        "aqius": 180,
        "mainus": "p2",
        "aqicn": 70,
        "maincn": "p2"
      };

      jest.spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockAirQuality));

      const result = await controller.create(
        newAirQuality as CreateAirQualityDto
      );

      expect(result).toEqual(mockAirQuality);
    });
  });

  describe('airQualityByZone ', () => {
    it(' RETURN INFORMATION AIR QUALITY By ZONE - PARIS ', async () => {
      const query = { lat: '48.856613', lon: '2.352222' };

      jest.spyOn(controller, 'findAirQualityByZone').mockImplementation()

      const result = await controller.findAirQualityByZone(query, query);
      console.log("result", result)

      expect(result.result.pollution).toEqual(mockAirQuality);
    });
  });


});
