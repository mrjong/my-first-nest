import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  password_salt: string

  @Column()
  nickname: string

  @Column({ default: 1, comment: '1 男性 2 女性 3 保密' })
  gender: number

  @Column({ default: '11' })
  avatar: string

  @Column({ default: 'ss' })
  city: string
}