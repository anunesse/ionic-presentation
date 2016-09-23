import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { Splashscreen, Device } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { AppService } from './app.service';

declare var firebase: any;

@Component({
    templateUrl: 'build/app.html'
})
class MyApp {

    rootPage: any = LoginPage;

    constructor(platform: Platform) {
        platform.ready().then((readySource) => {
            firebase.auth().signInAnonymously().catch(function(error) {
                console.error(error.code);
                console.error(error.message);
            });
        });
    }
}

ionicBootstrap(MyApp)