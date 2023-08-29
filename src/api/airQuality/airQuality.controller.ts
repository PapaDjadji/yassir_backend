import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req, HttpException } from '@nestjs/common';
import { logger } from '../../utils/logger';
import { AirQualityService } from './airQuality.service';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { UpdateAirQualityDto } from './dto/update-airQuality.dto';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
const PARISLAT = "48.856613";
const PARISLON = "2.352222";

@Controller('airQuality')
export class AirQualityController {


  constructor(private readonly airQualityService: AirQualityService) { }

  @Post('create')
  create(@Body() createAirQualityDto: CreateAirQualityDto) {
    return this.airQualityService.create(createAirQualityDto);
  }

  @Get('airQualityByZone')
  async findOne(@Req() req, @Res() res) {
    logger.info('--- AIRQUALITY.CONTROLLER.AIR_QUALITY_BY_ZONE INIT ---');
    try {
      const lat = req.query.lat;
      const lon = req.query.lon;
      const pollution = await this.airQualityService.getPollution(lat, lon);
      return res.status(HttpStatus.OK).json({ "Result": pollution });
    }
    catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async getAirQualityOfZone() {
    logger.info('--- AIR_QUALITY.CONTROLLER.GET_AIR_QUALIT_OF_ZONE INIT ---');
    try {
      const airQualityInfo = await this.airQualityService.getPollution(PARISLAT, PARISLON);
      const pollution = airQualityInfo.pollution;
      pollution.time = pollution.ts.match(/\d\d:\d\d/)[0];
      pollution.date = pollution.ts.slice(0, 10);
      await this.airQualityService.create(pollution);
    }
    catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('mostPolluted')
  async getDateTime(@Res() res) {
    logger.info("--- MOST_POLLUTED.CONTROLLER.GET_DATE_TIME INIT ---");
    try {
      const mostPolluted = await this.airQualityService.findMostPolluted();
      return res.status(HttpStatus.OK).json({ mostPolluted });
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
