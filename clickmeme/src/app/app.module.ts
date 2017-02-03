import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AppService } from './app.service';
import { Storage } from '@ionic/storage';
import { Device } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { RankingPage } from '../pages/ranking/ranking';
import { PhotoPage } from '../pages/photo/photo';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    RankingPage,
    PhotoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    RankingPage,
    PhotoPage
  ],
  providers: [
    AppService,
    Storage,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule { }
