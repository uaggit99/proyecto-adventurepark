import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parque, ParqueRelations, Ciudad, Visitante, Usuario, Zona} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {VisitanteRepository} from './visitante.repository';
import {UsuarioRepository} from './usuario.repository';
import {ZonaRepository} from './zona.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parque.prototype.id>;

  public readonly visitantes: HasManyRepositoryFactory<Visitante, typeof Parque.prototype.id>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Parque.prototype.id>;

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.visitantes = this.createHasManyRepositoryFactoryFor('visitantes', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitantes', this.visitantes.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
