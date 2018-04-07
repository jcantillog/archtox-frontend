import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class FarmacoService{

    //https://archtox.herokuapp.com/
    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        //this.url = 'http://localhost:3000/';
        this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'farmaco/';
    };

    addFarmaco(id_grupo_farmaco: string, nombre: string, molecula: string, nombres: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {id_grupo_farmaco: id_grupo_farmaco, nombre: nombre, molecula: molecula, nombres: nombres};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.url+this.sub_url+this.token_archtox, body, {headers: headers});
    }

    getFarmaco(id: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }

    getFarmacos(){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+this.token_archtox, {headers: headers})
    }

    updateFarmaco(id: string, id_grupo_farmaco: string, nombre: string, molecula: string, nombres: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {id_grupo_farmaco: id_grupo_farmaco, nombre: nombre, molecula: molecula, nombres: nombres};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.url+this.sub_url+id+this.token_archtox, body, {headers: headers});
    }

    deleteFarmaco(id: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }
}