import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Puestocomida, PuestocomidaRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class PuestocomidaRepository extends DefaultCrudRepository<
  Puestocomida,
  typeof Puestocomida.prototype.id,
  PuestocomidaRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Puestocomida.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Puestocomida, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
