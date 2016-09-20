import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';

@Component({
    templateUrl: 'build/app.html'
})
class MyApp {

    rootPage: any = LoginPage;

    constructor() {
    }
}

ionicBootstrap(MyApp)