import { firestore } from "firebase-admin";
import { Request, Response } from "express";
import { ManterUsuario } from "../model/ManterUsuario";
import { HttpUtil } from "../util/HttpUtil";

export class UsuarioService{
  private db: firestore.Firestore;

  constructor(db:firestore.Firestore) {
    this.db = db;
  }

  /**
   * O serviço cadastra o usuário, validando se ele existe ou não
   */
  public cadastrarUsuario(request: Request, response: Response) {
    const usuario: ManterUsuario = ManterUsuario.toManterUsuario(request.body);
    if(usuario.isUsuarioValido()) {
        this.db.collection("usuarios").where("email","==", usuario.email).get()
        .then(usuariosSnaps => {
          if (usuariosSnaps.size == 0) {
            var id = this.db.collection("x").doc().id;
            usuario.id=id;
            return this.db.doc(`usuarios/${id}`).create(usuario.toJson());
          } else {
            HttpUtil.falha("O usuário já existe, não é possível cadastrar", response);
            return null;
          }

        }).then(responseCriacaoUsuario => {
          if(responseCriacaoUsuario != null) {
            HttpUtil.sucesso(usuario, response);
          }
        }).catch(erro=>{
          HttpUtil.falha("Ops! tive uma falha"+erro,response);
        });
   
    } else {
      HttpUtil.falha("Usuário invalido", response);
    }
  }
}