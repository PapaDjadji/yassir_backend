import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { logger } from 'src/utils/logger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';

@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post('create')
 async create(@Res() res,  @Body() createOperatorDto: CreateOperatorDto) {
    logger.info("--- OPERATOR.CONTROLLER.CREATE INIT ---");
    const operator = await this.operatorService.create(createOperatorDto);
    return res.status(HttpStatus.OK).json({
      message: "Operator has been created successfully",
      operator
    })
  }

  @Post("getfees")
  @Roles(Role.Customer, Role.SuperAdmin, Role.Admin)
  async getFees(@Req() req, @Res() res) {
    logger.info("--- OPERATOR.CONTROLLER.GETFEES INT ---");
    var { fromOperator, toOperator} = req.body;
    let fees = await  this.operatorService.getFeesFromOperatorToOperator(fromOperator, toOperator);
    return res.status(HttpStatus.OK).json({
      fees
    })
  }

  @Get()
  findAll() {
    return this.operatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperatorDto: UpdateOperatorDto) {
    return this.operatorService.update(+id, updateOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operatorService.remove(+id);
  }
}
