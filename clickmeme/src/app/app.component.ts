import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RankingPage } from '../pages/ranking/ranking';
import { ProfilePage } from '../pages/profile/profile';

declare var firebase: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('nav') nav;

  rootPage = LoginPage;

  constructor(platform: Platform, public menuController: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      firebase.auth().signInAnonymously().catch(function(error) {
                console.error(error.code);
                console.error(error.message);
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
