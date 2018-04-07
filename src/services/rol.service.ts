import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class RolService{

    //https://archtox.herokuapp.com/
    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        //this.url = 'http://localhost:3000/';
        this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'rol/';
    };

    getRoles(){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+this.token_archtox, {headers: headers})
    }
}