import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Compras} from '../models';
import {ComprasRepository} from './compras.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly compras: BelongsToAccessor<Compras, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ComprasRepository') protected comprasRepositoryGetter: Getter<ComprasRepository>,
  ) {
    super(Factura, dataSource);
    this.compras = this.createBelongsToAccessorFor('compras', comprasRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
