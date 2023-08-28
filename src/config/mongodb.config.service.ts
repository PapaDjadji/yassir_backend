import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('db.uri'),
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
  }
}