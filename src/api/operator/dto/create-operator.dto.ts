import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOperatorDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    comissionIn: string;

    @IsNotEmpty()
    comissionOut: string;

    @IsOptional()
    logo?: string;
}
