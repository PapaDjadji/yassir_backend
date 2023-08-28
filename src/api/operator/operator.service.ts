import { Injectable, Post, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from './interfaces/operator.interface';
import { logger } from 'src/utils/logger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { TransferServiceEnum } from 'src/utils/enums/transferService.enum';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class OperatorService {

  constructor(@InjectModel('Operator') private operatorModel: Model<Operator>, private settingService : SettingService) { }

  create(createOperatorDto: CreateOperatorDto) {
    logger.info('--- OPERATOR.SREVICE.CREATE INIT ---');
    return this.operatorModel.create(createOperatorDto);
  }

  async getFeesFromOperatorToOperator(fromOperator, toOperator)  {
    logger.info(`--- OPERATOR.CONTROLLER.GETFEESFROMOPERATOR INIT - to Operator = ${toOperator}---`);
    let comissionInFromOperator = await this.operatorModel.findOne({ label : fromOperator }).exec();
    let comissionOutToOperator = await this.operatorModel.findOne({ label: toOperator }).exec();
    let settingInfo = await this.settingService.findOne();
    let comissionTotal = parseFloat(comissionInFromOperator.comissionIn) + parseFloat(comissionOutToOperator.comissionOut) + parseFloat(settingInfo[0].comissionPlatform);
    return comissionTotal.toString();
  }

    findAll() {
      return `This action returns all operator`;
    }



  async  findOne(operator: any) {
      return await this.operatorModel.findOne({ label : operator }).exec();
    }

    update(id: number, updateOperatorDto: UpdateOperatorDto) {
      return `This action updates a #${id} operator`;
    }

    remove(id: number) {
      return `This action removes a #${id} operator`;
    }
  }
