import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Parque} from './parque.model';

@model()
export class Ciudad extends Entity {
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
    required: false,
  })
  id_departamento: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasOne(() => Parque)
  parque: Parque;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
