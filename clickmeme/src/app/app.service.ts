import { Injectable } from '@angular/core';
import { NativeStorage, File } from 'ionic-native';
import { User } from './model/user';

declare var firebase: any;

@Injectable()
export class AppService {

    constructor() {
    }

    readUsers() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('users').orderByChild('points').once("value").then(function (snapshot) {
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

    updateAvatar(user: User) {
        var avatarRef = firebase.storage().ref().child('images/' + user.deviceId);
        File.readAsDataURL(File.applicationDirectory, 'www/assets/img/camera.png')
            .then(data => {
                console.log('asText', data);
                avatarRef.putString(data, 'data_url').then(
                    snapshot => {
                        console.log('Avatar Uploaded!');
                        user.avatar = user.deviceId;
                        this.updateUser(user);
                    },
                    error => console.error('Error uploading avatar', error)
                );
            })
            .catch(err => console.log('Cannot read file...', err));
    }

    getAvatar(user: User) {
        let url;
        if (user.avatar) {
            url = 'https://firebasestorage.googleapis.com/v0/b/clickmeme-2f0a0.appspot.com/o/images%2F' + user.avatar + '?alt=media';
        } else {
            url = 'assets/img/13.jpg';
        }
        return url;
    }

    getUser() {
        return NativeStorage.getItem('id');
    }

    avatarFromDeviceId(str: string) {
        return str.split('')
            .map(function (x) { return x.charCodeAt(0) })
            .reduce(function (p, c) { return p + c; }) % 32 + 1 + '.jpg';
    }

    createNewUser(uuid: string, infos: string[]) {
        let user = new User();
        user.deviceId = uuid;
        user.deviceProperties = infos;
        user.avatar = this.avatarFromDeviceId(uuid);
        this.updateUser(user);
    }
}




