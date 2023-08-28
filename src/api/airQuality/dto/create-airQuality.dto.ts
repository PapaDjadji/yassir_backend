import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAirQualityDto {
    @IsNotEmpty()
    ts: string;

    @IsNotEmpty()
    aqius: number;

    @IsNotEmpty()
    mainus:string;

    @IsNotEmpty()
    aqicn: number;

    @IsNotEmpty()
    maincn: string;

    @IsOptional()
    city?: string;

    @IsOptional()
    date?: string;

    @IsOptional()
    time?: string;
}
