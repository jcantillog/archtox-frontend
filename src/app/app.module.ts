import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {SigninPage} from "../pages/singin/signin";
import {GuidesPage} from "../pages/guides/guides";
import {DrugPage} from "../pages/drug/drug";
import {PharmacologicalGroupPage} from "../pages/pharmacological-group/pharmacological-group";
import {DrugInfoPage} from "../pages/drug-info/drug-info";
import {UserPage} from "../pages/user/user";
import {PharmagroupService} from "../services/pharmagroup.service";
import {HttpClientModule} from "@angular/common/http";
import {RolService} from "../services/rol.service";
import {UserService} from "../services/user.service";
import {AccesoService} from "../services/acceso.service";
import {AuthService} from "../services/auth.service";
import {IonicStorageModule} from "@ionic/storage";
import {FarmacoService} from "../services/farmaco.service";
import {InfofarmacoService} from "../services/infofarmaco.service";
import {AntidotePage} from "../pages/antidote/antidote";
import {AntidoteService} from "../services/antidote.service";
import {AntidoteInfoPage} from "../pages/antidote-info/antidote-info";

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    GuidesPage,
    DrugPage,
    DrugInfoPage,
    PharmacologicalGroupPage,
    UserPage,
    AntidotePage,
    AntidoteInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    GuidesPage,
    DrugPage,
    DrugInfoPage,
    PharmacologicalGroupPage,
    UserPage,
    AntidotePage,
    AntidoteInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    PharmagroupService,
    RolService,
    UserService,
    AccesoService,
    FarmacoService,
    InfofarmacoService,
    AntidoteService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
