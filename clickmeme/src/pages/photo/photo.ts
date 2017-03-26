import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
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

    takePicture() {
        Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL, allowEdit: true, targetWidth: 500, targetHeight: 500}).then(
            image => this.appService.updateAvatar(this.user, "data:image/jpeg;base64," + image),
            err => console.error('Error uploading avatar', err)
        );
    }
}
