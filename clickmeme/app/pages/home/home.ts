import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Device } from 'ionic-native';
import { AppService } from '../../app.service';

import { User } from '../../model/user';
import { Grid } from '../../model/grid';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AppService, Device]
})
export class HomePage {
    private timer: number;
    public grid: Grid;

    public user: User;

    constructor(private navCtrl: NavController, navParams: NavParams, private appService: AppService) {
        this.appService.getStorage().getJson('id').then((data) => {
            this.user = data;
            this.initGrid();
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    initGrid() {
        this.grid = new Grid();
        this.grid.winIndex = Math.floor((Math.random() * 9) + 1);
        var wPicIndex = Math.floor((Math.random() * 32) + 1);
        var lPicIndex;
        do {
            lPicIndex = Math.floor((Math.random() * 32) + 1);
        } while(lPicIndex === wPicIndex);
        this.grid.winPic = 'build/img/' + wPicIndex + '.jpg';
        this.grid.loosePic = 'build/img/' + lPicIndex + '.jpg';
        console.info(this.grid);
    }

    win() {
        this.user.points += Math.max(0, 100 - this.timer / 20);
        this.user.click += 1;
        this.user.minTime = Math.min(this.user.minTime, this.timer);
        console.info(this.user);
        this.appService.updateUser(this.user);
    }
}
