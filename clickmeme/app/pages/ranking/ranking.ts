import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { AppService } from '../../app.service';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/ranking/ranking.html',
  providers: [AppService]
})
export class RankingPage {
    public users: User[] = new Array<User>();
    public order: string = 'points';
    public up: boolean = false;

    constructor(private navCtrl: NavController, navParams: NavParams, private appService: AppService) {
        this.appService.readUsers().then(data => {
            Object.keys(data).forEach(element => {
                this.users.push(data[element]);
            });
            this.users.sort(function(a, b){return b.points - a.points});
        });
    }
}
