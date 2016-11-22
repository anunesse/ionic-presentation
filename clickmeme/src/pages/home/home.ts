import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AppService } from '../../app/app.service';

import { User } from '../../app/model/user';
import { Grid } from '../../app/model/grid';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  date: number;
  timeout: any;

  timer: number;
  grid: Grid = new Grid();
  user: User;
  out: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.appService.getUser().then((data: User) => {
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
    } while (lPicIndex === wPicIndex);
    this.grid.winPic = 'assets/img/' + wPicIndex + '.jpg';
    this.grid.loosePic = 'assets/img/' + lPicIndex + '.jpg';
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
