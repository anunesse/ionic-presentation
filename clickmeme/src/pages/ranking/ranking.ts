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
       return this.appService.getAvatar(user);
    }
}
