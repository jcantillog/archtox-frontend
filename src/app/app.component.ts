import {Component, ViewChild} from '@angular/core';
import {
    AlertController, Events, LoadingController, MenuController, NavController, Platform,
    ToastController
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {SigninPage} from "../pages/singin/signin";
import {GuidesPage} from "../pages/guides/guides";
import {UserPage} from "../pages/user/user";
import {AuthenticationModel} from "../model/authentication.model";
import {AuthService} from "../services/auth.service";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  activePage: any;

  guidesPage = GuidesPage;
  userPage = UserPage;

  isAuthenticated: boolean = false;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private events: Events, private authService: AuthService) {
      events.subscribe('user:authenticated', (user: AuthenticationModel) => {
          this.setAuth(true);
      });
      events.subscribe('system:errorHandler', (status, type, errortype) => {
          this.errorHandler(status, type, errortype);
      });

      authService.verify()
          .then((auth: AuthenticationModel) =>{
              if(auth!=null){
                  this.setAuth(true);
              }else{
                  this.setAuth(false);
              }
          })
          .catch(error => console.log(error));
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  setAuth(auth: boolean){
    if(auth){
        this.isAuthenticated = true;
        this.rootPage = GuidesPage;
        this.activePage = GuidesPage;
    }else{
      this.isAuthenticated = false;
      this.rootPage = SigninPage;
    }
  }

  checkActivePage(page: any){
      return page == this.activePage;
  }

  onLoad(page: any){
      this.activePage = page;
      this.nav.setRoot(page);
      this.menuCtrl.close();
  }

  showCredits(){
      let alert = this.alertCtrl.create({
          title: 'Información del sitio ArchTox',
          subTitle: 'Participantes del proyecto',
          message: 'Rubén Darío Salas: <br>Químico Farmacéutico, M.Sc., Ph.D.<br><br>' +
                    'Erick Guerrero Archbold: <br>Químico Farmacéutico.<br><br>' +
                    'Jonathan C. Cantillo G.: <br>Front-end Software Developer.<br><br>' +
                    'Ever Cabarcas Mallarino: <br>Back-end Software Developer',
          buttons: [
              {
                  text: 'Aceptar',
                  role: 'cancel',
                  handler: () => {}
              }
          ]
      });
      alert.present();
  }

  onLogout(closing: number = 0){
      if(closing == 1){
          let alert = this.alertCtrl.create({
              title: 'Información',
              message: '¿Está seguro que desea cerrar sesión?',
              buttons: [
                  {
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: () => {}
                  },
                  {
                      text: 'Aceptar',
                      handler: () => {
                          this.onClose();
                      }
                  }
              ]
          });
          alert.present();
      }else{
          this.onClose();
      }
  }

  onClose(){
      const loading = this.loadingCtrl.create({
          content: 'Cerrando sesión...'
      });
      loading.present();
      this.authService.signout();
      this.menuCtrl.close();
      this.setAuth(false);
      let toast = this.toastCtrl.create({
          message: 'Sesión finalizada.',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Ok'
      });
      toast.present();
      loading.dismiss();
  }

  errorHandler(status: string, type: string, errortype: number){
      let toast = this.toastCtrl.create({
          message: 'Error en: '+type+' ('+status+')',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'Ok'
      });
      toast.present();
      if(errortype == 401) this.onLogout();
  }
}

