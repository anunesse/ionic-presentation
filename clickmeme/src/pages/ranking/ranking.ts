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
    up: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
        this.appService.readUsers().then(data => {
            Object.keys(data).forEach(element => {
                this.users.push(data[element]);
            });
            this.sort();
        });
    }

    sort() {
        this.users.sort((a, b) => {
            let order = this.up ? 1 : -1;
            switch (this.order) {
                case 'time':
                    return (b.minTime - a.minTime) * order;
                case 'clicks':
                    return (b.click - a.click) * order;
                case 'ratio':
                    if (b.click === 0 && a.click === 0) {
                        return 0;
                    } else if (b.click === 0) {
                        return -1 * order;
                    } else if (a.click === 0) {
                        return 1 * order;
                    } else {
                        return (b.points / b.click - a.points / a.click) * order;
                    }
                case 'points':
                default:
                    return (b.points - a.points) * order;
            }
        });
    }

    getAvatar(user: User) {
        return this.appService.getAvatar(user);
    }
}