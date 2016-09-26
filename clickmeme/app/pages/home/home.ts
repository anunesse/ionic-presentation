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
    private date: number;
    private timeout: any;

    public timer: number;
    public grid: Grid = new Grid();
    public user: User;
    public out: boolean = false;

    constructor(private navCtrl: NavController, navParams: NavParams, private appService: AppService) {
        this.appService.getStorage().getJson('id').then((data) => {
            this.user = data;
            this.initGrid();
            this.date = new Date().getTime();
        }).catch((ex) => {
            console.error('Error fetching user', ex);
        });
    }

    loop() {
        this.initGrid();
        this.date = new Date().getTime();
        this.out = false;
    }

    initGrid() {
        this.grid.winIndex = Math.floor((Math.random() * 9) + 1);
        var wPicIndex = Math.floor((Math.random() * 32) + 1);
        var lPicIndex;
        do {
            lPicIndex = Math.floor((Math.random() * 32) + 1);
        } while(lPicIndex === wPicIndex);
        this.grid.winPic = 'build/img/' + wPicIndex + '.jpg';
        this.grid.loosePic = 'build/img/' + lPicIndex + '.jpg';
    }

    win(i: number) {
        if (i != this.grid.winIndex)
            return;
        this.out = true;
        this.timeout = setTimeout(() => 
            this.loop(), 3000
        );

        this.timer = new Date().getTime() - this.date;
        this.user.points += Math.floor(Math.max(0, 100 - this.timer / 20));
        this.user.click += 1;
        this.user.minTime = Math.min(this.user.minTime, this.timer);
        this.appService.updateUser(this.user);
    }

    goToProfilePage() {
        this.navCtrl.push(ProfilePage);
    }
}
