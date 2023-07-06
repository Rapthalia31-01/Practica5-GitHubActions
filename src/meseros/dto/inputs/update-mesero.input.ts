import { IsUUID } from 'class-validator';
import { CreateMeseroInput } from './create-mesero.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMeseroInput extends PartialType(CreateMeseroInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
