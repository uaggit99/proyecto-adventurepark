import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visitante,
  Parque,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteParqueController {
  constructor(
    @repository(VisitanteRepository)
    public visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/parque', {
    responses: {
      '200': {
        description: 'Parque belonging to Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async getParque(
    @param.path.string('id') id: typeof Visitante.prototype.id,
  ): Promise<Parque> {
    return this.visitanteRepository.parque(id);
  }
}
