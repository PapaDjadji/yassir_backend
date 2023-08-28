import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { MomentModule } from '@ccmos/nestjs-moment';
import { CommandModule } from 'nestjs-command';
import { MongodbConfigService } from './config/mongodb.config.service';
import { simpleFunc } from './middlewares/simple-func.middleware';
import { AirQualityModule } from './api/airQuality/airQuality.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ConfigModule,
    AirQualityModule,
    CommandModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule],
        useClass: MongodbConfigService,
      inject: [ConfigService],
    }),
    MomentModule.forRoot({
      tz: 'Africa/Dakar',
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(simpleFunc)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
