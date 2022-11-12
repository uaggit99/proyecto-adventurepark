import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generator = require("password-generator");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  GenerarClave() {
    let clave = generator(8, false);
    return clave;
  }
  CifrarClave(clave: string) {
    let ClaveCifrada = cryptoJs.MD5(clave).toString();
    return ClaveCifrada;
  }
  IdentificarUsuario(usuario: string, clave: string) {
    try {
      let p = this.usuarioRepository.findOne({where: {correo: usuario, clave: clave}});
      if (p) {
        return p;
      }
      return false;

    } catch {
      return false;

    }
  }
  GenerarTokenJWT(usuario: Usuario) {

    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombres + " " + usuario.apellidos

      }

    },
      Llaves.claveJWT);
    return token;

  }
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    } catch {
      return false;


    }

  }

}
