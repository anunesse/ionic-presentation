import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AppService } from '../../app/app.service';
import { User } from '../../app/model/user';

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {

    pseudo: string;
    loading: boolean = true;

    constructor(public navCtrl: NavController, public appService: AppService, platform: Platform) {
        platform.ready().then(() => {
            this.appService.initUser().then(
                user => {
                    if (user.pseudo) {
                        this.navCtrl.setRoot(HomePage);
                    } else {
                        this.loading = false;
                    }
                },
                (error) => {
                    this.loading = false;
                    console.error('Error fetching user', error);
                }
            )
        });
    }

    login() {
        if (this.pseudo != undefined && this.pseudo.trim().length > 2) {
            this.loading = true;
            this.appService.getUser().then((user: User) => {
                this.loading = false;
                user.pseudo = this.pseudo;
                this.appService.updateUser(user);
                this.navCtrl.setRoot(HomePage);
            })
        }
    }
}
