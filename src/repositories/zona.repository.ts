import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Zona, ZonaRelations, Atraccion, Puestocomida, Parque} from '../models';
import {AtraccionRepository} from './atraccion.repository';
import {PuestocomidaRepository} from './puestocomida.repository';
import {ParqueRepository} from './parque.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly atraccions: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.id>;

  public readonly puestocomidas: HasManyRepositoryFactory<Puestocomida, typeof Zona.prototype.id>;

  public readonly parque: BelongsToAccessor<Parque, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('PuestocomidaRepository') protected puestocomidaRepositoryGetter: Getter<PuestocomidaRepository>, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>,
  ) {
    super(Zona, dataSource);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
    this.puestocomidas = this.createHasManyRepositoryFactoryFor('puestocomidas', puestocomidaRepositoryGetter,);
    this.registerInclusionResolver('puestocomidas', this.puestocomidas.inclusionResolver);
    this.atraccions = this.createHasManyRepositoryFactoryFor('atraccions', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atraccions', this.atraccions.inclusionResolver);
  }
}
