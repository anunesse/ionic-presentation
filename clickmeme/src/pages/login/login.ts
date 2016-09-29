import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Device } from 'ionic-native';
import { AppService } from '../../app/app.service';
import { User } from '../../app/model/user';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  public user: User;

  constructor(public navCtrl: NavController, public appService: AppService) {
    this.user = new User();
    if (Device.device.uuid) {
      this.user.deviceId = Device.device.uuid;
      this.user.deviceProperties += Device.device.platform + ', ';
      this.user.deviceProperties += Device.device.version + ', ';
      this.user.deviceProperties += Device.device.model + ', ';
      this.user.deviceProperties += Device.device.manufacturer;
    } else { 
      this.user.deviceId = 'defaultweb00';
    }
    this.user.avatar = this.appService.avatarFromDeviceId(this.user.deviceId);

    this.appService.getStorage().get('id').then((data) => {
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
