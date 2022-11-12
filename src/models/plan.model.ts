import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parque} from './parque.model';

@model()
export class Plan extends Entity {
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
  valor: string;

  @property({
    type: 'string',
    required: true,
  })
  atraccionesvalidas: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parque: string;

  @belongsTo(() => Parque)
  parqueId: string;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
