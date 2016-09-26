import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, NavController, MenuController } from 'ionic-angular';
import { Splashscreen, Device } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { AppService } from './app.service';

declare var firebase: any;

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {

    @ViewChild('nav') nav;
    
    rootPage: any = LoginPage;

    constructor(private platform: Platform, private menucController: MenuController) {
        platform.ready().then((readySource) => {
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
            default:
                break;
        }
        this.menucController.close();
    }
}

ionicBootstrap(MyApp)