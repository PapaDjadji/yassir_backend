import { Document } from 'mongoose';

export interface AirQuality extends Document {
  ts: string;
  aqius: number;
  mainus:string;
  aqicn: number;
  maincn: string;
  city: string;
  date: string;
  time: string;
  readonly created_at: Date;
  updated_at: Date;
}
