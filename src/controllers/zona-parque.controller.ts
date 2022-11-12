import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Zona,
  Parque,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaParqueController {
  constructor(
    @repository(ZonaRepository)
    public zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/parque', {
    responses: {
      '200': {
        description: 'Parque belonging to Zona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async getParque(
    @param.path.string('id') id: typeof Zona.prototype.id,
  ): Promise<Parque> {
    return this.zonaRepository.parque(id);
  }
}
