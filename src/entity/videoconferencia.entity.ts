import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Sindicato } from "./sindicato.entity"
import { Usuario } from "./usuario.entity"

@Entity()
export class VideoConferencia {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    nombre: string

    @Column({nullable: true})
    descripcion: string

    @ManyToOne(type => Usuario)
    @JoinColumn()
    citado_por: Usuario

    @Column({nullable: true})
    estado: number

    @CreateDateColumn({nullable: true})
    fecha: Date

    @ManyToOne(type => Usuario, {nullable: true})
    @JoinColumn()
    encargado: Usuario

    @ManyToOne(type => Usuario, {nullable: true})
    @JoinColumn()
    tecnico_respaldo: Usuario

    @Column({nullable: true})
    mannana: boolean

    @Column({nullable: true})
    tarde: boolean

    @CreateDateColumn({nullable: true})
    hora_inicio: Date

    @CreateDateColumn({nullable: true})
    hora_fin: Date

    @Column({nullable: true, default: false})
    not_allowed: boolean

    @Column({nullable: true})
    archivo: string

    @Column({nullable: true})
    cant_personas: number

    @Column({nullable: true})
    salon: string

    @ManyToOne(type=>Sindicato, {nullable: true})
    @JoinColumn()
    sindicato: Sindicato;
}
