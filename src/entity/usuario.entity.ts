import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Piso } from "./pisos.entity"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    usuario: string

    @Column()
    password: string

    @Column()
    nombre: string

    @Column()
    correo: string

    @CreateDateColumn()
    fecha_registro: Date

    @CreateDateColumn()
    ultima_sesion: Date

    @Column()
    rol: string

    @ManyToOne(type=>Piso, {nullable: true})
    @JoinColumn()
    piso: Piso

}
