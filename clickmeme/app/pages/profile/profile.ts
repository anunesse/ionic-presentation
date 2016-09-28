import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { AppService } from '../../app.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [AppService]
})
export class ProfilePage {
    public user: User;

    constructor(private navCtrl: NavController, navParams: NavParams, private appService: AppService) {
        this.appService.getStorage().getJson('id').then((data) => {
            this.user = data;
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    edit() {
        this.appService.updateUser(this.user);
    }
}
