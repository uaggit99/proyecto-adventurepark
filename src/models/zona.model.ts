import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Atraccion} from './atraccion.model';
import {Puestocomida} from './puestocomida.model';
import {Parque} from './parque.model';

@model()
export class Zona extends Entity {
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
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parque: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;
  @hasMany(() => Atraccion)
  atraccions: Atraccion[];

  @hasMany(() => Puestocomida)
  puestocomidas: Puestocomida[];

  @belongsTo(() => Parque)
  parqueId: string;

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
