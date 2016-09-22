import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
    public login: {};

    constructor(private navCtrl: NavController, navParams: NavParams) {
        firebase.database().ref('/users/' + 1).once('value').then(function(snapshot) {
            this.login = snapshot.val();
        });
    }

    goToHomePage() {
        this.navCtrl.push(HomePage);
    }
}
