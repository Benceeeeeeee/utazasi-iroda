import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travels } from './travels';
import { CreateTravelsDto } from './createtravels.dto';
import { UpdateTravelDto } from './updateTravels.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  utazasok: Travels[] = [
    {
      id: 1,
      utazasiCel: "Japán",
      leiras: "30 karakter hosszú szöveeeeeeeeeeeeeeeeeg",
      kepURL: "https://hu.japanspecialist.com/o/adaptive-media/image/568998/large/pk0003_key_miyajima_island_itsukushima_shrine.jpg?t=1636471509193",
      ar: 1000000,
      kedvezmeny: 10,
    },
    {
      id: 2,
      utazasiCel: "Brazil",
      leiras: "You are going to BRAZILllllllllllllllllll",
      kepURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg",
      ar: 10000000000,
      kedvezmeny: 30,
    }
  ];
  nextId = 3;

  @Get('travels')
  listazas() {
    return this.utazasok
  }

  @Get('travels/:travelid')
  utazasIdAlapjan(@Param('travelid') id: string){
    const idSzam = parseInt(id);
    const utazas = this.utazasok.find(utazas => utazas.id == idSzam);

    if(!utazas){
      throw new NotFoundException("Nincs ilyen ID-jű utazás");
    }
    return utazas;
  }

  @Post('travels')
  @HttpCode(201)
  ujUtazas(@Body() ujutazasAdatok: CreateTravelsDto){
    const ujUtazas: Travels = {
      id: this.nextId,
      ...ujutazasAdatok,
      kedvezmeny: 0,
    }
    this.nextId++;
    this.utazasok.push(ujUtazas);

    return ujUtazas;
  }

  @Patch('travels/:travelid')
  @HttpCode(200)
  utazasModositas(@Param('travelid') id: string, @Body() travelsAdatok: UpdateTravelDto){
    const idSzam = parseInt(id);
    const eredetiTravelId = this.utazasok.findIndex(travel => travel.id == idSzam);
    const eredetiTravel = this.utazasok[eredetiTravelId];

    const ujTravel: Travels = {
      ...eredetiTravel,
      ...travelsAdatok,
    };

    this.utazasok[eredetiTravelId] = ujTravel;
    return ujTravel;
  }

  @Delete('travels/:travelid')
  @HttpCode(204)
  konyvTorles(@Param('travelid') id: string){
    const idSzam = parseInt(id);
    const travel = this.utazasok.findIndex(travel => travel.id == idSzam);
    
    this.utazasok.splice(travel, 1);
  }
}
