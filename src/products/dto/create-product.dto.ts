import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNumber, Min, Max, IsOptional } from "class-validator";

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}