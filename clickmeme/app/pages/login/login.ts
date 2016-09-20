import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home'

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController) {
  }

  login() {
      this.navCtrl.push(HomePage);
  }
}
