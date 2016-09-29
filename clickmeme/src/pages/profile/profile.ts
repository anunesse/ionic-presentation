import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/model/user';
import { AppService } from '../../app/app.service';

@Component({
  templateUrl: 'profile.html'
})
export class ProfilePage {
    public user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
        this.appService.getStorage().get('id').then((data) => {
            this.user = data;
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    edit() {
        this.appService.updateUser(this.user);
    }
}
