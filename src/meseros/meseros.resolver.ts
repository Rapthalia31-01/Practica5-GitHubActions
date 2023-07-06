import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { MeserosService } from './meseros.service';
import { Mesero} from './entities/mesero.entity';
import { UpdateMeseroInput, CreateMeseroInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Mesero)
export class MeserosResolver {
  constructor(private readonly meserosService: MeserosService) {}

  @Mutation(() => Mesero)
  async createMesero(@Args('createMeseroInput') createMeseroInput: CreateMeseroInput)
  :Promise<Mesero> {
    return this.meserosService.create(createMeseroInput);
  }

  @Query(() => [Mesero], { name: 'meseros' })
  async findAll():Promise<Mesero[]> {
    return this.meserosService.findAll();
  }

  @Query(() => Mesero, { name: 'mesero' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Mesero> {
    return this.meserosService.findOne(id);
  }

  @Mutation(() => Mesero)
  updateMesero(@Args('updateMeseroInput') updateMeseroInput: UpdateMeseroInput): Promise<Mesero> {
    return this.meserosService.update(updateMeseroInput.id, updateMeseroInput);
  }

  @Mutation(() => Mesero)
  removeMesero(@Args('id', { type: () => ID }) id: string): Promise<Mesero> {
    return this.meserosService.remove(id);
  }
}
