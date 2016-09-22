import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { User } from '../../model/user';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    public user: User;

    constructor(private navCtrl: NavController, navParams: NavParams) {
        this.user = new User();
        
        firebase.database().ref('/users/' + 1).once('value').then(function(snapshot) {
            var login = snapshot.val();
            console.info(login);
        });
    }

    goToProfilePage() {
        this.navCtrl.push(ProfilePage);
    }
}
