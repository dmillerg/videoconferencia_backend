import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
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

    @Column()
    piso: number

}
