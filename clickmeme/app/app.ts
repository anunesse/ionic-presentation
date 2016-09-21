import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';

@Component({
    templateUrl: 'build/app.html'
})
class MyApp {

    rootPage: any = LoginPage;

    constructor(platform: Platform) {
        platform.ready().then((readySource) => {
        });
    }
}

ionicBootstrap(MyApp)