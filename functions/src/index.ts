import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from "firebase-admin";
import { UsuarioService } from "./services/Usuario.service";

//Banco firestore
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


// Relacionado ao usuário
const usuarioExpress = express()

const usuarioService = new UsuarioService(db);

usuarioExpress.get("/cadastrarUsuario", (req, res) => usuarioService.cadastrarUsuario(req,res));

// usuarioExpress.get("/logarUsuario", (req, res) => serviceUsuario.logarUsuario(req, res));

export const usuario = functions.https.onRequest(usuarioExpress);
// A segunda relacionada aos posts
