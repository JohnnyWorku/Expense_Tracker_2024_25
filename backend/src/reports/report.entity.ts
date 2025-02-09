import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  type: string; // 'monthly', 'weekly', 'custom'

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column() title: string;

  @Column('jsonb')
  data: any;
}
