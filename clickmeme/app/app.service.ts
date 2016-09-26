import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';
import { User } from './model/user';

declare var firebase: any;

@Injectable()
export class AppService {

    public local: any;

    constructor() {
        this.local = new Storage(LocalStorage);
    }

    readUser(deviceId: string) {
        
    }

    updateUser(user: User): void {
        firebase.database().ref('users/' + user.deviceId).set(user);
        this.local.setJson('id', user);
    }

    getStorage(): Storage {
        return this.local;
    }
}