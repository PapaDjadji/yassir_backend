import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { SmsTypeModule } from './api/sms-type/sms-type.module';
import { configuration } from './config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { MomentModule } from '@ccmos/nestjs-moment';
import { AuthModule } from './api/auth/auth.module';
import { FilesService } from './services/file/files.service';
import { PhoneMessageModule } from './api/phone-message/phone-message.module';
import { SmsModule } from './api/sms/sms.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './api/auth/roles.guard';
import { SettingModule } from './api/setting/setting.module';
import { CommandModule } from 'nestjs-command';
import { SmsUtilModule } from './services/smsUtil/smsUtil.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './api/auth/auth.service';
import { UserService } from './api/user/user.service';
import { UserSchema } from './api/user/schemas/user.schema';
import { MongodbConfigService } from './config/mongodb.config.service';
import { TransactionModule } from './api/transaction/transaction.module';
import { OrangeMoneyServiceModule } from './external_services/orange-money-service/orange-money-service.module';
import { WalletModule } from './api/wallet/wallet.module';
import { OperatorModule } from './api/operator/operator.module';
import { TransferModule } from './api/transfer/transfer.module';
import { WaveServiceModule } from './external_services/wave-service/wave-service.module';
import { SavePaymentModule } from './api/save-payment/save-payment.module';
import { PresentModule } from './api/present/present.module';

@Module({
  imports: [
    ConfigModule,
    OrangeMoneyServiceModule,
    SavePaymentModule,
    PresentModule,
    WaveServiceModule,
    TransactionModule,
    TransferModule,
    WalletModule,
    OperatorModule,
    AuthModule,
    PhoneMessageModule,
    CommandModule,
    SmsModule,
    SmsUtilModule,
    SmsTypeModule,
    SettingModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [
        UserModule,
        ConfigModule],
        useClass: MongodbConfigService,
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: '/opt/setane',
    }),
    MomentModule.forRoot({
      tz: 'Africa/Dakar',
    }),
    AuthModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthMiddleware,
    FilesService,
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/login', method: RequestMethod.POST },
        { path: 'api/auth/register', method: RequestMethod.POST },
        { path: 'api/user/rememberLogin', method: RequestMethod.POST },
        { path: 'api/wave-service/testApiFree', method: RequestMethod.POST },
        { path: 'api/wave-service/balanceFree', method: RequestMethod.GET},
        { path: 'api/phoneMessage/checkPhoneCode', method: RequestMethod.POST },
        { path: 'api/auth/mailInfo', method: RequestMethod.POST }, 
        { path: 'api/wave-service/paymentNotification', method: RequestMethod.POST },
        { path: 'api/free-service/paymentNotification', method: RequestMethod.POST },
        { path: 'api/user/forgotPassword', method: RequestMethod.POST },
        { path: 'api/auth/twoFactorCodeVerification/:phoneNumber', method: RequestMethod.POST },
        { path: 'api/auth/smsCodeVerification/:phoneNumber', method: RequestMethod.POST },
        { path: 'api/auth/forgotSmsCodeVerification/:phoneNumber', method: RequestMethod.POST },
        { path: 'api/auth/resendSmsCodeVerification', method: RequestMethod.POST },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
