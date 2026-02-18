import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

@Entity('product')
@ObjectType()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsString()
  @Column()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  @Max(100)
  @Column()
  discount: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Column({ nullable: true, type: 'decimal', scale: 1 })
  rating: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  @Field(() => Category, { nullable: true })
  category: Category;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
