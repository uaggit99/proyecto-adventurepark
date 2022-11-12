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
  Visitante,
  Compras,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteComprasController {
  constructor(
    @repository(VisitanteRepository) protected visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Visitante has many Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compras)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Compras>,
  ): Promise<Compras[]> {
    return this.visitanteRepository.compras(id).find(filter);
  }

  @post('/visitantes/{id}/compras', {
    responses: {
      '200': {
        description: 'Visitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compras)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {
            title: 'NewComprasInVisitante',
            exclude: ['id'],
            optional: ['visitanteId']
          }),
        },
      },
    }) compras: Omit<Compras, 'id'>,
  ): Promise<Compras> {
    return this.visitanteRepository.compras(id).create(compras);
  }

  @patch('/visitantes/{id}/compras', {
    responses: {
      '200': {
        description: 'Visitante.Compras PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {partial: true}),
        },
      },
    })
    compras: Partial<Compras>,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.visitanteRepository.compras(id).patch(compras, where);
  }

  @del('/visitantes/{id}/compras', {
    responses: {
      '200': {
        description: 'Visitante.Compras DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.visitanteRepository.compras(id).delete(where);
  }
}
