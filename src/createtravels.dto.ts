import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTravelsDto{
    @IsString({message: 'Az utazási célnak szövegnek kell lennie'})
    @IsNotEmpty({message: 'Nem lehet üres'})
    utazasiCel: string;

    @MinLength(30)
    leiras: string;

    @IsString()
    kepURL: string;

    @IsNumber()
    ar: number;

    kedvezmeny: number;
}