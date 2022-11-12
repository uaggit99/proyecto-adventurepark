import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Puestocomida} from '../models';
import {PuestocomidaRepository} from '../repositories';

export class PuestocomidaController {
  constructor(
    @repository(PuestocomidaRepository)
    public puestocomidaRepository : PuestocomidaRepository,
  ) {}

  @post('/puestocomidas')
  @response(200, {
    description: 'Puestocomida model instance',
    content: {'application/json': {schema: getModelSchemaRef(Puestocomida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puestocomida, {
            title: 'NewPuestocomida',
            exclude: ['id'],
          }),
        },
      },
    })
    puestocomida: Omit<Puestocomida, 'id'>,
  ): Promise<Puestocomida> {
    return this.puestocomidaRepository.create(puestocomida);
  }

  @get('/puestocomidas/count')
  @response(200, {
    description: 'Puestocomida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Puestocomida) where?: Where<Puestocomida>,
  ): Promise<Count> {
    return this.puestocomidaRepository.count(where);
  }

  @get('/puestocomidas')
  @response(200, {
    description: 'Array of Puestocomida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Puestocomida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Puestocomida) filter?: Filter<Puestocomida>,
  ): Promise<Puestocomida[]> {
    return this.puestocomidaRepository.find(filter);
  }

  @patch('/puestocomidas')
  @response(200, {
    description: 'Puestocomida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puestocomida, {partial: true}),
        },
      },
    })
    puestocomida: Puestocomida,
    @param.where(Puestocomida) where?: Where<Puestocomida>,
  ): Promise<Count> {
    return this.puestocomidaRepository.updateAll(puestocomida, where);
  }

  @get('/puestocomidas/{id}')
  @response(200, {
    description: 'Puestocomida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Puestocomida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Puestocomida, {exclude: 'where'}) filter?: FilterExcludingWhere<Puestocomida>
  ): Promise<Puestocomida> {
    return this.puestocomidaRepository.findById(id, filter);
  }

  @patch('/puestocomidas/{id}')
  @response(204, {
    description: 'Puestocomida PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puestocomida, {partial: true}),
        },
      },
    })
    puestocomida: Puestocomida,
  ): Promise<void> {
    await this.puestocomidaRepository.updateById(id, puestocomida);
  }

  @put('/puestocomidas/{id}')
  @response(204, {
    description: 'Puestocomida PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() puestocomida: Puestocomida,
  ): Promise<void> {
    await this.puestocomidaRepository.replaceById(id, puestocomida);
  }

  @del('/puestocomidas/{id}')
  @response(204, {
    description: 'Puestocomida DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.puestocomidaRepository.deleteById(id);
  }
}
