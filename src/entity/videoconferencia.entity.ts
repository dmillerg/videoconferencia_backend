import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany } from "typeorm"
import { Usuario } from "./usuario.entity"

@Entity()
export class VideoConferencia {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    citado_por: string

    @Column()
    estado: string

    @CreateDateColumn()
    fecha: string

    @ManyToOne(type => Usuario)
    encargado: string

    @ManyToOne(type => Usuario)
    tecnico_respaldo: string

    @Column()
    mannana: boolean

    @Column()
    tarde: boolean

    @CreateDateColumn()
    hora_inicio: Date

    @CreateDateColumn()
    hora_fin: Date

    @Column()
    not_allowed: boolean

    @Column()
    archivo: string

}
