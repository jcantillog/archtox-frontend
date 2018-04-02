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

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    GuidesPage,
    DrugPage,
    DrugInfoPage,
    PharmacologicalGroupPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    GuidesPage,
    DrugPage,
    DrugInfoPage,
    PharmacologicalGroupPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PharmagroupService,
    RolService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
