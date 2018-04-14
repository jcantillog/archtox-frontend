import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class PharmagroupService{

    //https://archtox.herokuapp.com/
    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        this.url = 'http://localhost:3000/';
        // this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'grupofarmacologico/';
    };

    addGroup(nombre: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {nombre: nombre};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.url+this.sub_url+this.token_archtox, body, {headers: headers});
    }

    getGroup(id: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }

    getGroups(){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+this.token_archtox, {headers: headers})
    }

    updateGroup(id: string, nombre: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {nombre: nombre};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.url+this.sub_url+id+this.token_archtox, body, {headers: headers});
    }

    deleteGroup(id: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }
}