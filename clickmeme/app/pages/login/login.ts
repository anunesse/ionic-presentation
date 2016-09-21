import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import {HomePage} from '../home/home'

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController, http: Http) {
  }

  login() {
      this.navCtrl.push(HomePage);
  }
}
