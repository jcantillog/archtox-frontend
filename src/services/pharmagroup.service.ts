import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';

@Injectable()
export class PharmagroupService{

    constructor(private http: HttpClient){}

    addGroup(nombre: string){
        const body = {nombre: nombre};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('https://archtox.herokuapp.com/grupofarmacologico', body, {headers: headers});
    }

    getGroup(id: string){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get('https://archtox.herokuapp.com/grupofarmacologico/'+id, {headers: headers});
    }

    getGroups(){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get('https://archtox.herokuapp.com/grupofarmacologico', {headers: headers})
    }

    updateGroup(id: string, nombre: string){
        const body = {nombre: nombre};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put('https://archtox.herokuapp.com/grupofarmacologico/'+id, body, {headers: headers});
    }

    deleteGroup(id: string){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete('https://archtox.herokuapp.com/grupofarmacologico/'+id, {headers: headers});
    }
}