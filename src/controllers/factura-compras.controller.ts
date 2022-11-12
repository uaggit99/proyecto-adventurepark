import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Compras,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaComprasController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/compras', {
    responses: {
      '200': {
        description: 'Compras belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compras)},
          },
        },
      },
    },
  })
  async getCompras(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Compras> {
    return this.facturaRepository.compras(id);
  }
}
