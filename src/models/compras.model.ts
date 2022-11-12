import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Visitante} from './visitante.model';
import {Factura} from './factura.model';

@model()
export class Compras extends Entity {
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
  id_visitantes: string;

  @property({
    type: 'string',
    required: true,
  })
  id_plan: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  formapago: number;

  @property({
    type: 'date',
    required: true,
  })
  fechacompra: string;

  @property({
    type: 'date',
    required: true,
  })
  fechauso: string;

  @property({
    type: 'string',
    required: true,
  })
  id_factura: string;

  @belongsTo(() => Visitante)
  visitanteId: string;

  @hasOne(() => Factura)
  factura: Factura;

  constructor(data?: Partial<Compras>) {
    super(data);
  }
}

export interface ComprasRelations {
  // describe navigational properties here
}

export type ComprasWithRelations = Compras & ComprasRelations;
