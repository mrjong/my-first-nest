import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastNamw: string

  @Column({ default: true })
  isActive: boolean

  @Column()
  password: string
}