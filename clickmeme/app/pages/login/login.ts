import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Device } from 'ionic-native';
import { AppService } from '../../app.service';

import { User } from '../../model/user';

declare var firebase: any;

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AppService, Device]
})
export class LoginPage {

  public user: User;

  constructor(private navCtrl: NavController, private appService: AppService) {
    this.user = new User();
    if (Device.device.uuid) {
      this.user.deviceId = Device.device.uuid;
      
    } else { 
      this.user.deviceId = 'defaultweb00';
      //this.user.avatar = 13;
    }
    this.user.avatar = this.appService.avatarFromDeviceId(this.user.deviceId);

    this.appService.getStorage().getJson('id').then((data) => {
      if (data) {
        this.navCtrl.setRoot(HomePage);
      }
    }).catch((ex) => {
      console.error('Error fetching user', ex);
    });
  }

  login() {
    //validate user.pseudo
    if (this.user.pseudo === undefined || this.user.pseudo.trim().length === 0) {
      return;
    }

    this.appService.updateUser(this.user);
    this.navCtrl.setRoot(HomePage);
  }
}
