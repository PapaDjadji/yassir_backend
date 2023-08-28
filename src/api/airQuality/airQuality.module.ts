import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityController } from './airQuality.controller';
import { AirQualityService } from './airQuality.service';
import { AirQualitySchema } from './schemas/airQuality.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AirQuality', schema: AirQualitySchema }])
  ],
  controllers: [AirQualityController],
  providers: [AirQualityService],
  exports: [AirQualityService]
})
export class AirQualityModule {}
