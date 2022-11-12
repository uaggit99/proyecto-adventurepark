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
  Parque,
  Visitante,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueVisitanteController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Array of Parque has many Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visitante>,
  ): Promise<Visitante[]> {
    return this.parqueRepository.visitantes(id).find(filter);
  }

  @post('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {
            title: 'NewVisitanteInParque',
            exclude: ['id'],
            optional: ['parqueId']
          }),
        },
      },
    }) visitante: Omit<Visitante, 'id'>,
  ): Promise<Visitante> {
    return this.parqueRepository.visitantes(id).create(visitante);
  }

  @patch('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parque.Visitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Partial<Visitante>,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.parqueRepository.visitantes(id).patch(visitante, where);
  }

  @del('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parque.Visitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.parqueRepository.visitantes(id).delete(where);
  }
}
