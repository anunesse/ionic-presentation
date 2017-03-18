import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { User } from '../../app/model/user';

@Component({
  templateUrl: 'photo.html'
})
export class PhotoPage {   
    public user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
        this.appService.getUser().then((data: User) => {
            this.user = data;
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    uploadAvatar() {
        this.appService.updateAvatar(this.user);
    }
}
