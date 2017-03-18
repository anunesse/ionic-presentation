import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/model/user';
import { AppService } from '../../app/app.service';

@Component({
  templateUrl: 'ranking.html'
})
export class RankingPage {
    users: User[] = new Array<User>();
    order: string = 'points';
    up: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
        this.appService.readUsers().then(data => {
            Object.keys(data).forEach(element => {
                this.users.push(data[element]);
            });
            this.users.sort(function(a, b){return b.points - a.points});
        });
    }

    getAvatar(user: User) {
        let url;
        if(user.avatar) {
            url = 'https://firebasestorage.googleapis.com/v0/b/clickmeme-2f0a0.appspot.com/o/images%2F' + user.avatar + '?alt=media';
        } else {
            url = 'assets/img/13.jpg';
        }
        return url;
    }
}
