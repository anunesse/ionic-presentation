import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AppService } from '../../app/app.service';
import { User } from '../../app/model/user';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  public user: User;

  constructor(public navCtrl: NavController, public appService: AppService) {
    this.user = new User();

    this.appService.getStorage().get('id').then((data) => {
      if (data) {
        this.navCtrl.setRoot(HomePage);
      }
    }).catch((ex) => {
      console.error('Error fetching user', ex);
    });
  }

  login() {
    // Validate user.pseudo
    if (this.user.pseudo === undefined || this.user.pseudo.trim().length === 0) {
      return;
    }

    this.appService.updateUser(this.user);
    this.navCtrl.setRoot(HomePage);
  }
}
