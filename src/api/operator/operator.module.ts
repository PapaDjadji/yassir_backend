import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorSchema } from './schemas/operator.schema';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [
    SettingModule,
    MongooseModule.forFeature([{ name: 'Operator', schema: OperatorSchema }])
  ],
  controllers: [OperatorController],
  providers: [OperatorService],
  exports: [OperatorService]
})
export class OperatorModule {}
