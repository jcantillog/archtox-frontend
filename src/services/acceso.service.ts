import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class AccesoService{

    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        // this.url = 'http://localhost:3000/';
        this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'acceso/';
    };

    getAcceso(id_user: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+id_user+this.token_archtox, {headers: headers});
    }

    updateAcceso(id: string, id_user: string, key_pass: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {id_user: id_user, key_pass: key_pass};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.url+this.sub_url+id+this.token_archtox, body, {headers: headers});
    }
}