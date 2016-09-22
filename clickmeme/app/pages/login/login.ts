import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { User } from '../../model/user';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  public user: User;

  constructor(private navCtrl: NavController) {
    this.user = new User();
  }

  login() {
    console.info('Loggin ' + this.user.pseudo);
    firebase.database().ref('users/' + 1).set(this.user);
    this.navCtrl.push(HomePage);
  }
}
