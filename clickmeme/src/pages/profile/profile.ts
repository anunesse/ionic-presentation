import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/model/user';
import { AppService } from '../../app/app.service';
import { PhotoPage } from '../photo/photo';

@Component({
    templateUrl: 'profile.html'
})
export class ProfilePage {
    user: User;
    isEditing: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    }

    loadUser() {
        this.appService.getUser().then((data: User) => {
            this.user = data;
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    ionViewWillEnter() {
        this.loadUser();
        this.isEditing = false;
    }

    edit() {
        this.isEditing = true;
    }

    valid() {
        this.isEditing = false;
        this.appService.updateUser(this.user);
    }

    getAvatar(user: User) {
        return this.appService.getAvatar(user);
    }

    editAvatar() {
        this.navCtrl.push(PhotoPage);
    }
}
