import { Component } from '@angular/core';
import {Events, LoadingController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-singin',
  templateUrl: 'singin.html',
})
export class SigninPage {

  constructor(private loadingCtrl: LoadingController, private authService: AuthService,
              private events: Events) {
  }

  onSignin(form: NgForm){
        const loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        loading.present();
        this.authService.signin(form.value.identificacion, form.value.contraseña)
            .subscribe(
                data => {
                    loading.dismiss();
                    this.events.publish('user:authenticated', data);
                },
                error => {
                    loading.dismiss();
                    //console.log(JSON.parse(error));
                    this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Inicio de sesión", error.status);
                }
            );
    }
}
