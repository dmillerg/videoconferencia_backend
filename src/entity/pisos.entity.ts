import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Piso {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    numero: string
}
