import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Visitante} from './visitante.model';
import {Usuario} from './usuario.model';
import {Zona} from './zona.model';

@model()
export class Parque extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  visitantespermitidos: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenlogo: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenmapa: string;

  @property({
    type: 'string',
    required: true,
  })
  eslogan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: false,
  })
  id_ciudad: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @hasMany(() => Visitante)
  visitantes: Visitante[];

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Zona)
  zonas: Zona[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
