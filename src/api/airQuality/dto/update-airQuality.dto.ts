import { PartialType } from '@nestjs/mapped-types';
import { CreateAirQualityDto } from './create-airQuality.dto';

export class UpdateAirQualityDto extends PartialType(CreateAirQualityDto) {}
