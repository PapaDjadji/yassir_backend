import { HttpException, Injectable, Post, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAirQualityDto } from './dto/create-airQuality.dto';
import { UpdateAirQualityDto } from './dto/update-airQuality.dto';
import { AirQuality } from './interfaces/airQuality.interface';
import axios from "axios";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirQualityService {

  constructor(@InjectModel('AirQuality') private airQualityModel: Model<AirQuality>, private configService: ConfigService) { }

  create(createAirQualityDto: CreateAirQualityDto) {
    return this.airQualityModel.create(createAirQualityDto);
  }

  async getPollution(lat: string, lon: string) {
    return await axios.get(`${this.configService.get("URL_API_AIR_QUALITY")}?lat=${lat}&lon=${lon}&key=${this.configService.get("KEY_API_AIR_QUALITY")}`)
      .then(response => {
        delete response.data.data.current.weather;
        return response.data.data.current;
      }, error => { 
        throw new HttpException(error.message, error.status);
      });
  }

  async findMostPolluted() {
    return await this.airQualityModel.findOne()
      .sort({ aqius: -1 })
      .select('-ts -aqius -mainus -aqicn -maincn -active -_id -created_at -updated_at -__v')
      .exec()
  }

  findAll() {
    return `This action returns all airQuality`;
  }



  async findOne(airQuality: any) {
    return `This action updates a airQuality`;
  }

  update(id: number, updateAirQualityDto: UpdateAirQualityDto) {
    return `This action updates a #${id} airQuality`;
  }

  remove(id: number) {
    return `This action removes a #${id} airQuality`;
  }
}
