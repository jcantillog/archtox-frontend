import {UserModel} from "./user.model";

export class AuthenticationModel{
    constructor(public usuario: UserModel,
                public token_archtox: object){}
}