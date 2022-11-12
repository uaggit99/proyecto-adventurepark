import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Compras,
  Visitante,
} from '../models';
import {ComprasRepository} from '../repositories';

export class ComprasVisitanteController {
  constructor(
    @repository(ComprasRepository)
    public comprasRepository: ComprasRepository,
  ) { }

  @get('/compras/{id}/visitante', {
    responses: {
      '200': {
        description: 'Visitante belonging to Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async getVisitante(
    @param.path.string('id') id: typeof Compras.prototype.id,
  ): Promise<Visitante> {
    return this.comprasRepository.visitante(id);
  }
}
