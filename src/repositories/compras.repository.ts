import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compras, ComprasRelations, Visitante, Factura} from '../models';
import {VisitanteRepository} from './visitante.repository';
import {FacturaRepository} from './factura.repository';

export class ComprasRepository extends DefaultCrudRepository<
  Compras,
  typeof Compras.prototype.id,
  ComprasRelations
> {

  public readonly visitante: BelongsToAccessor<Visitante, typeof Compras.prototype.id>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Compras.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Compras, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.visitante = this.createBelongsToAccessorFor('visitante', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitante', this.visitante.inclusionResolver);
  }
}
