import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Compras} from './compras.model';

@model()
export class Factura extends Entity {
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
    type: 'number',
    required: true,
  })
  valorneto: number;

  @property({
    type: 'number',
    required: true,
  })
  valoriva: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  metodopago: number;

  @property({
    type: 'string',
    required: true,
  })
  id_compra: string;

  @belongsTo(() => Compras)
  comprasId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
