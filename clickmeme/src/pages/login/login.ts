import { Component } from '@angular/core';
import { Device } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AppService } from '../../app/app.service';
import { User } from '../../app/model/user';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  pseudo: string;

  constructor(public navCtrl: NavController, public appService: AppService, platform: Platform) {
    platform.ready().then(() => {
      this.appService.getUser().then(
        (data: User) => {
          if (data.pseudo) {
            this.navCtrl.setRoot(HomePage);
          }
        },
        (error) => {
          if (error.code == 2) { //NativeStorageError.ITEM_NOT_FOUND
            let infos = new Array<string>();
            if (Device.device.platform) { infos.push(Device.device.platform) };
            if (Device.device.version) { infos.push(Device.device.version); }
            if (Device.device.model) { infos.push(Device.device.model); }
            if (Device.device.manufacturer) { infos.push(Device.device.manufacturer); }
            this.appService.createNewUser(Device.device.uuid ? Device.device.uuid : 'defaultweb00', infos);
          } else {
            console.error('Error fetching user', error);
          }
        }
      )
    });
  }

  login() {
    if (this.pseudo != undefined && this.pseudo.trim().length > 2) {
      this.appService.getUser().then((user: User) => {
        user.pseudo = this.pseudo;
        this.appService.updateUser(user);
        this.navCtrl.setRoot(HomePage);
      })
    }
  }
}
