import {Component, ViewChild} from '@angular/core';
import {
    AlertController, LoadingController, MenuController, NavController, Platform,
    ToastController
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {SigninPage} from "../pages/singin/signin";
import {GuidesPage} from "../pages/guides/guides";
import {UserPage} from "../pages/user/user";
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
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.setAuth(true);
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
      // this.authService.signout();
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
          position: 'middle',
          showCloseButton: true,
          closeButtonText: 'Ok'
      });
      toast.present();
      if(errortype == 401) this.onLogout();
  }
}

