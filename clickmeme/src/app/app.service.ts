import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from './model/user';

declare var firebase: any;

@Injectable()
export class AppService {

    public user: User;

    constructor(public storage: Storage) {
        this.user = new User();
    }

    readUsers() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('users').orderByChild('points').once("value").then(function(snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    updateUser(user: User): void {
        firebase.database().ref('users/' + user.deviceId).set(user);
        this.storage.set('id', user);
    }

    getStorage(): Storage {
        return this.storage;
    }

    avatarFromDeviceId(str: string) {
        return str.split('')
            .map(function(x) { return x.charCodeAt(0)})
            .reduce(function(p, c) {return p + c;}) % 32 + 1 + '.jpg';
    }

    setUserInfo(uuid: string, infos: string[]) {
        this.user.deviceId = uuid;
        this.user.deviceProperties = infos;
        this.user.avatar = this.avatarFromDeviceId(uuid);
        this.storage.set('id', this.user);
    }
}