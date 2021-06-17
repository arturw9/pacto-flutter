export class ManterUsuario {
  nome?: string;
  email?: string;
  senha?: string;
  id?: string;
  constructor(nome?: string, email?: string, senha?:string, id?:string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.id = this.id;
  }
isUsuarioValido(): boolean{
    return this.email !== null && this.email !== "" && this.senha !== null && this.senha !== "";
  }

  static toManterUsuario(json: any): ManterUsuario {
    return new ManterUsuario(json.nome,json.email,json.senha,json.id);
  }

  public toJson(): any{
    return JSON.parse(JSON.stringify(this));
  }
}