import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./User.entity.js"

@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar" })
  token!: string

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user!: User

  @CreateDateColumn()
  createdAt!: Date

  @Column({ type: "bool", default: false })
  revoked!: boolean
}