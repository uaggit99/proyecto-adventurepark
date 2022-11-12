import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Compras,
  Factura,
} from '../models';
import {ComprasRepository} from '../repositories';

export class ComprasFacturaController {
  constructor(
    @repository(ComprasRepository) protected comprasRepository: ComprasRepository,
  ) { }

  @get('/compras/{id}/factura', {
    responses: {
      '200': {
        description: 'Compras has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.comprasRepository.factura(id).get(filter);
  }

  @post('/compras/{id}/factura', {
    responses: {
      '200': {
        description: 'Compras model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Compras.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInCompras',
            exclude: ['id'],
            optional: ['comprasId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.comprasRepository.factura(id).create(factura);
  }

  @patch('/compras/{id}/factura', {
    responses: {
      '200': {
        description: 'Compras.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.comprasRepository.factura(id).patch(factura, where);
  }

  @del('/compras/{id}/factura', {
    responses: {
      '200': {
        description: 'Compras.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.comprasRepository.factura(id).delete(where);
  }
}
