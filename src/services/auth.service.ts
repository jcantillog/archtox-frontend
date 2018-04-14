import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {AuthenticationModel} from "../model/authentication.model";

@Injectable()
export class AuthService{

    //https://archtox.herokuapp.com/
    private url: string;
    private sub_url: string;
    private authInfo: AuthenticationModel;

    constructor(private storage: Storage, private http: HttpClient){
        this.url = 'http://localhost:3000/';
        // this.url = 'https://archtox.herokuapp.com/';
        this.sub_url = 'login/';
    }

    getUser(){
        return this.storage.get('user')
            .then(
                (user: string) => {
                    return user != null ? user: "";
                }
            )
    }

    verify(){
        return this.storage.get('auth')
            .then((auth: AuthenticationModel) => {
                this.authInfo = auth != null ? auth: null;
                return this.authInfo;
            })
            .catch(error => console.log(error));
    }

    signout(){
        this.storage.remove('auth');
        this.storage.remove('user');
        this.authInfo = null;
    }

    signin(id_user: string, key_pass: string){
        const body = {id_user: id_user, key_pass: key_pass};
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.url+this.sub_url, body, {headers: headers})
            .map((response: any) => {
                    this.authInfo = response ? response : null;
                    this.storage.set('auth', this.authInfo);
                    this.storage.set('user', id_user);
                    return this.authInfo;
                }
            );
    }

    getAuthInfo(){
        return this.authInfo;
    }
}