import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';

@Injectable()
export class RolService{

    constructor(private http: HttpClient){}

    getRoles(){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get('https://archtox.herokuapp.com/rol', {headers: headers})
    }
}