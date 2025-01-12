import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column()
  period: string;

  @Column() // Add this line
  startDate: Date; // Add this line

  @Column() // Add this line
  endDate: Date; // Add this line

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;
}
