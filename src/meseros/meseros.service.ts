import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeseroInput, UpdateMeseroInput } from './dto/inputs';
import { Mesero } from './entities/mesero.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MeserosService {

  constructor( 
    @InjectRepository(Mesero)
    private readonly meserosRepository:Repository<Mesero> ){}

  async create(createMeseroInput: CreateMeseroInput): Promise<Mesero>  {
    const newMesero= this.meserosRepository.create(createMeseroInput);
    return await this.meserosRepository.save(newMesero); 
  }

  async findAll(): Promise<Mesero[]> {
    return this.meserosRepository.find();
  }

  async findOne(id: string): Promise<Mesero> {
     const mesero= await  this.meserosRepository.findOneBy({id});
     if (!mesero) throw new NotFoundException(`Not found`)
     return mesero;
  }

  async update(id: string, updateMeseroInput: UpdateMeseroInput): Promise<Mesero> {
    
    const mesero = await this.meserosRepository.preload(updateMeseroInput);
    if (!mesero) throw new NotFoundException(`Not found`)
    return this.meserosRepository.save(mesero);

  }

  async remove(id: string): Promise<Mesero> {

    const mesero= await  this.findOne(id);

     await this.meserosRepository.update({id:id},{estado:false  });

    // await this.meserosRepository.remove(mesero);

    return {...mesero, id};

  }
}
