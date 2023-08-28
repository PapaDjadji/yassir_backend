import { Document } from 'mongoose';
import { Role } from 'src/utils/enums/role.enum';

export interface Operator extends Document {
  label: any;
  comissionIn: string;
  comissionOut: string;
  logo: string;
  readonly created_at: Date;
  updated_at: Date;
}
