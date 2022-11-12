import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Zona} from './zona.model';

@model()
export class Puestocomida extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  id_zona: string;

  @property({
    type: 'string',
    required: true,
  })
  menu: string[];

  @belongsTo(() => Zona)
  zonaId: string;

  constructor(data?: Partial<Puestocomida>) {
    super(data);
  }
}

export interface PuestocomidaRelations {
  // describe navigational properties here
}

export type PuestocomidaWithRelations = Puestocomida & PuestocomidaRelations;
