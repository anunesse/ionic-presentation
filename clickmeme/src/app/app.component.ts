import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Device } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RankingPage } from '../pages/ranking/ranking';
import { ProfilePage } from '../pages/profile/profile';
import { AppService } from './app.service';

declare var firebase: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('nav') nav;

  rootPage = LoginPage;

  constructor(platform: Platform, public menuController: MenuController, appService: AppService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      firebase.auth().signInAnonymously().catch(function(error) {
                console.error(error.code);
                console.error(error.message);
      });

      appService.getStorage().get('id').then((data) => {
        if (!data) {
          let infos = new Array<string>();
          if (Device.device.platform) {infos.push(Device.device.platform)};
          if (Device.device.version) {infos.push(Device.device.version);}
          if (Device.device.model) {infos.push(Device.device.model);}
          if (Device.device.manufacturer) {infos.push(Device.device.manufacturer);}
          appService.setUserInfo(Device.device.uuid ? Device.device.uuid : 'defaultweb00', infos);
        }
      }).catch((ex) => {
        console.error('Error fetching user', ex);
      });
    });
  }

  goToPage(str: string) {
        switch (str) {
            case 'profile':
                this.nav.setRoot(ProfilePage);
                break;
            case 'home':
                this.nav.setRoot(HomePage);
                break;
            case 'ranking':
                this.nav.setRoot(RankingPage);
                break;
            default:
                break;
        }
        this.menuController.close();
    }
}
