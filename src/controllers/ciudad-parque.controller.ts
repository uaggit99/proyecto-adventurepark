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
  Ciudad,
  Parque,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadParqueController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/parque', {
    responses: {
      '200': {
        description: 'Ciudad has one Parque',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parque),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque> {
    return this.ciudadRepository.parque(id).get(filter);
  }

  @post('/ciudads/{id}/parque', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) parque: Omit<Parque, 'id'>,
  ): Promise<Parque> {
    return this.ciudadRepository.parque(id).create(parque);
  }

  @patch('/ciudads/{id}/parque', {
    responses: {
      '200': {
        description: 'Ciudad.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.ciudadRepository.parque(id).patch(parque, where);
  }

  @del('/ciudads/{id}/parque', {
    responses: {
      '200': {
        description: 'Ciudad.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.ciudadRepository.parque(id).delete(where);
  }
}
