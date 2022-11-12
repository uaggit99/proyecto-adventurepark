import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visitante, VisitanteRelations, Parque, Compras} from '../models';
import {ParqueRepository} from './parque.repository';
import {ComprasRepository} from './compras.repository';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {

  public readonly parque: BelongsToAccessor<Parque, typeof Visitante.prototype.id>;

  public readonly compras: HasManyRepositoryFactory<Compras, typeof Visitante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('ComprasRepository') protected comprasRepositoryGetter: Getter<ComprasRepository>,
  ) {
    super(Visitante, dataSource);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', comprasRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
  }
}
