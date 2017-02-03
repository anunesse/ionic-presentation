import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { AppService } from './app.service';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RankingPage } from '../pages/ranking/ranking';
import { ProfilePage } from '../pages/profile/profile';
import { PhotoPage } from '../pages/photo/photo';

declare var firebase: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public appService: AppService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },      
      { title: 'Ranking', component: RankingPage },
      { title: 'Photo', component: PhotoPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      firebase.auth().signInAnonymously().catch(function (error) {
        console.error(error.code);
        console.error(error.message);
      });

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
