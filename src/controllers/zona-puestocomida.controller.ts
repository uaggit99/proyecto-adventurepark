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
  Zona,
  Puestocomida,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaPuestocomidaController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/puestocomidas', {
    responses: {
      '200': {
        description: 'Array of Zona has many Puestocomida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Puestocomida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Puestocomida>,
  ): Promise<Puestocomida[]> {
    return this.zonaRepository.puestocomidas(id).find(filter);
  }

  @post('/zonas/{id}/puestocomidas', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Puestocomida)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puestocomida, {
            title: 'NewPuestocomidaInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) puestocomida: Omit<Puestocomida, 'id'>,
  ): Promise<Puestocomida> {
    return this.zonaRepository.puestocomidas(id).create(puestocomida);
  }

  @patch('/zonas/{id}/puestocomidas', {
    responses: {
      '200': {
        description: 'Zona.Puestocomida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puestocomida, {partial: true}),
        },
      },
    })
    puestocomida: Partial<Puestocomida>,
    @param.query.object('where', getWhereSchemaFor(Puestocomida)) where?: Where<Puestocomida>,
  ): Promise<Count> {
    return this.zonaRepository.puestocomidas(id).patch(puestocomida, where);
  }

  @del('/zonas/{id}/puestocomidas', {
    responses: {
      '200': {
        description: 'Zona.Puestocomida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Puestocomida)) where?: Where<Puestocomida>,
  ): Promise<Count> {
    return this.zonaRepository.puestocomidas(id).delete(where);
  }
}
