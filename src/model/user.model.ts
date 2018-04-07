export class UserModel{
    constructor(public _id: string,
                public id_user: string,
                public id_rol: string,
                public nombre: string,
                public apellidos: string,
                public correo: string){}
}