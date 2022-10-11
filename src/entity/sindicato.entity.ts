import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Piso } from "./pisos.entity"

@Entity()
export class Sindicato {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column({unique: true})
    siglas: string

    @Column()
    descripcion: string

    @ManyToOne(type=>Piso)
    @JoinColumn()
    piso: Piso

}
