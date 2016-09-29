import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { RankingPage } from '../pages/ranking/ranking';
import { AppService } from './app.service';
import { Storage } from '@ionic/storage';
import { Device } from 'ionic-native';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    RankingPage
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
    RankingPage
  ],
  providers: [
    AppService,
    Storage,
    Device
  ]
})
export class AppModule {}
