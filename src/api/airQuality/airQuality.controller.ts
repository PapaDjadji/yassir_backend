import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/utils/logger';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { UpdateAirQualityDto } from './dto/update-airQuality.dto';

@Controller('airQuality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService, private configService: ConfigService) { }

  @Post('create')
  async create(@Res() res, @Body() createAirQualityDto: CreateAirQualityDto) {
    return this.airQualityService.create(createAirQualityDto);
  }

  @Get('airQualityByZone')
  async findOne(@Req() req, @Res() res) {
    logger.info('--- AIRQUALITY.CONTROLLER.AIR_QUALITY_BY_ZONE INIT ---');
    try {
      const lat = req.query.lat;
      const lon = req.query.lon;
      const pollution = await this.airQualityService.getPollution(lat, lon);
      return res.status(HttpStatus.OK).json({"Result": pollution});
    }
    catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAirQualityDto: UpdateAirQualityDto) {
    return this.airQualityService.update(+id, updateAirQualityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airQualityService.remove(+id);
  }
}
