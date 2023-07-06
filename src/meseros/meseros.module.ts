import { Module } from '@nestjs/common';
import { MeserosService } from './meseros.service';
import { MeserosResolver } from './meseros.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesero} from './entities/mesero.entity';

@Module({
  providers: [MeserosResolver, MeserosService],
  imports:[
    TypeOrmModule.forFeature([Mesero])
  ]
})
export class MeserosModule {}
