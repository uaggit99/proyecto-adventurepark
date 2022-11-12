import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Compras} from './compras.model';
import {Parque} from './parque.model';

@model()
export class Visitante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  tipodocumento: number;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Parque)
  parqueId: string;

  @hasMany(() => Compras)
  compras: Compras[];

  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;
