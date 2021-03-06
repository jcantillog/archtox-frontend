import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class InfofarmacoService{

    private url: string;
    private sub_url: string;

    private token_archtox: string;

    constructor(private http: HttpClient, private authService: AuthService){
        // this.url = 'http://localhost:3000/';
        this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'infofarmaco/';
    };

    addInfoFarmaco(id_farmaco: string, tratamiento: string, eliminacion: string, paciente: string, absorcion: string, terapia: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {id_farmaco: id_farmaco, tratamiento: tratamiento, eliminacion: eliminacion, paciente: paciente, absorcion: absorcion, terapia: terapia};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.url+this.sub_url+this.token_archtox, body, {headers: headers});
    }

    getInfoFarmaco(id_farmaco: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+id_farmaco+this.token_archtox, {headers: headers});
    }

    getInfoFarmacos(){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.url+this.sub_url+this.token_archtox, {headers: headers})
    }

    updateInfoFarmaco(id: string, id_farmaco: string, tratamiento: string, eliminacion: string, paciente: string, absorcion: string, terapia: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const body = {id_farmaco: id_farmaco, tratamiento: tratamiento, eliminacion: eliminacion, paciente: paciente, absorcion: absorcion, terapia: terapia};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.url+this.sub_url+id+this.token_archtox, body, {headers: headers});
    }

    deleteInfoFarmaco(id: string){
        this.token_archtox = this.authService.getAuthInfo().token_archtox ? '?token_archtox=' + this.authService.getAuthInfo().token_archtox: '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete(this.url+this.sub_url+id+this.token_archtox, {headers: headers});
    }
}