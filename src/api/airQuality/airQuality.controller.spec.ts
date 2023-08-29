import { ConsoleLogger, HttpModule, HttpService, HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { AirQualityController } from './airQuality.controller';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { AirQuality } from './entities/airQuality.entity';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;
  let model: Model<AirQuality>;
  let configService: ConfigService;
  let app: INestApplication;
  let httpService: HttpService;


  const mockAirQualityService = {
    create: jest.fn(),
    findAirQualityByZone: jest.fn(),
    findMostPolluted: jest.fn(),
    getPollution: jest.fn()
  };

  const mockAirQuality = {
    "ts": "2023-08-29T12:00:00.000Z",
    "aqius": 38,
    "mainus": "p2",
    "aqicn": 13,
    "maincn": "p2"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      controllers: [AirQualityController],
      providers: [AirQualityService, ConfigService,
        {
          provide: getModelToken(AirQuality.name),
          useValue: mockAirQualityService
        }],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
    configService = module.get<ConfigService>(ConfigService);
    model = module.get<Model<AirQuality>>(getModelToken(AirQuality.name));

    app = module.createNestApplication();
    httpService =module.get<HttpService>(HttpService);
    await app.init();
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

  describe('findAirQualityByZone', () => {
  it('GET pollution from Zone (PARIS)', async () => {
    const result: AxiosResponse = {
      data: mockAirQuality,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: undefined
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result.data));

    const response = await request(app.getHttpServer())
      .get('/airQuality/airQualityByZone?lat=16.0333&lon=-16.5')
      .expect(200);

    expect(JSON.parse(response.text).Result.pollution).toHaveProperty("ts")
  });

  it('throws error if he did not provide the correct end-point', async () => {
    const result: AxiosResponse = {
      data:mockAirQuality,
      status: 200,
      statusText: '',
      headers: {},
      config: undefined
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result.data));

    return await request(app.getHttpServer())
      .get('/airQuality/airQualityByZonee?lat=16.0333&lon=')
      .expect(404);
  });
});



});
