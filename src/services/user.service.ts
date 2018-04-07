import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService{

    //https://archtox.herokuapp.com/
    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        this.url = 'http://localhost:3000/';
        this.sub_url = 'users/';
    };

    addUser(id_user: string, id_rol: string, nombre: string, apellidos: string, correo: string, key_pass: string){
        this.token_archtox = this.authService.getAuthInfo() ? '?token_archtox=' + this.authService.getAuthInfo(): '';
        const body = {id_user: id_user, id_rol: id_rol, nombre: nombre, apellidos: apellidos, correo: correo, key_pass: key_pass};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.url+this.sub_url+this.token_archtox, body, {headers: headers});
    }

    getUser(id: string){
        this.token_archtox = this.authService.getAuthInfo() ? '?token_archtox=' + this.authService.getAuthInfo(): '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }

    getUsers(){
        this.token_archtox = this.authService.getAuthInfo() ? '?token_archtox=' + this.authService.getAuthInfo(): '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+this.token_archtox, {headers: headers})
    }

    updateUser(id: string, id_user: string, id_rol: string, nombre: string, apellidos: string, correo: string){
        this.token_archtox = this.authService.getAuthInfo() ? '?token_archtox=' + this.authService.getAuthInfo(): '';
        const body = {id_user: id_user, id_rol: id_rol, nombre: nombre, apellidos: apellidos, correo: correo};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.url+this.sub_url+id+this.token_archtox, body, {headers: headers});
    }

    deleteUser(id: string){
        this.token_archtox = this.authService.getAuthInfo() ? '?token_archtox=' + this.authService.getAuthInfo(): '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }
}