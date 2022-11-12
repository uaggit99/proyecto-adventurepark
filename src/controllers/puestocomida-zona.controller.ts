import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Puestocomida,
  Zona,
} from '../models';
import {PuestocomidaRepository} from '../repositories';

export class PuestocomidaZonaController {
  constructor(
    @repository(PuestocomidaRepository)
    public puestocomidaRepository: PuestocomidaRepository,
  ) { }

  @get('/puestocomidas/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to Puestocomida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async getZona(
    @param.path.string('id') id: typeof Puestocomida.prototype.id,
  ): Promise<Zona> {
    return this.puestocomidaRepository.zona(id);
  }
}
