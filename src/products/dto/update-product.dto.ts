import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNumber, Min, Max, IsOptional } from "class-validator";

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}