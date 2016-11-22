import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { User } from './model/user';

declare var firebase: any;

@Injectable()
export class AppService {

    constructor() {
    }

    readUsers() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('users').orderByChild('points').once("value").then(function(snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    updateUser(user: User): void {
        NativeStorage.setItem('id', user)
        .then(
            () => {
                console.log('User stored!');
                firebase.database().ref('users/' + user.deviceId).set(user);
            },
            error => console.error('Error storing user', error)
        );
    }

    getUser() {
        return NativeStorage.getItem('id');
    }

    avatarFromDeviceId(str: string) {
        return str.split('')
            .map(function(x) { return x.charCodeAt(0)})
            .reduce(function(p, c) {return p + c;}) % 32 + 1 + '.jpg';
    }

    createNewUser(uuid: string, infos: string[]) {
        let user = new User();
        user.deviceId = uuid;
        user.deviceProperties = infos;
        user.avatar = this.avatarFromDeviceId(uuid);
        this.updateUser(user);
    }
}




