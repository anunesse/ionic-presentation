import { Injectable } from '@angular/core';
import { NativeStorage, File, Device } from 'ionic-native';
import { User } from './model/user';

declare var firebase: any;

@Injectable()
export class AppService {

    constructor() {
    }

    readUsers() {
        return new Promise<any>((resolve, reject) => {
            firebase.database().ref('users').orderByChild('points').once("value").then(
                snapshot => resolve(snapshot.val()),
                error => reject(error));
        });
    }

    private readUser(deviceId: string) {
        return new Promise<User>((resolve, reject) => {
            if (deviceId) {
                firebase.database().ref('users/' + deviceId).once("value").then(
                    snapshot => snapshot.val() ? resolve(snapshot.val()) : reject("Not present in database"),
                    error => reject(error));
            } else {
                reject("not a device");
            }
        });
    }

    updateUser(user: User) {
        return new Promise<User>((resolve, reject) => {
            NativeStorage.setItem('id', user).then(
                () => {
                    console.log('User stored!');
                    firebase.database().ref('users/' + user.deviceId).set(user);
                    resolve(user);
                },
                error => {
                    console.error('Error storing user', error);
                    reject(error);
                });
        });
    }

    updateAvatar(user: User, base64Img: String) {
        let date = Date.now();
        let avatarRef = firebase.storage().ref().child('images/' + user.deviceId + date);
        avatarRef.putString(base64Img, 'data_url').then(
            snapshot => {
                console.log('Avatar Uploaded!');
                user.avatar = user.deviceId + date;
                this.updateUser(user);
            },
            error => console.error('Error uploading avatar', error)
        ).catch(err => console.log('Cannot read file...', err));
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

    initUser() {
        return new Promise<User>((resolve, reject) => {
            this.getUser().then(
                user => {
                    console.log('From Storage', user);
                    resolve(user);
                },
                error => this.readUser(Device.uuid).then(
                    user => {
                        console.log('From firebase', user);
                        this.updateUser(user);
                        resolve(user);
                    },
                    error => {
                        console.log('New User');
                        let infos = new Array<string>();
                        if (Device.platform) { infos.push(Device.platform) };
                        if (Device.version) { infos.push(Device.version); }
                        if (Device.model) { infos.push(Device.model); }
                        if (Device.manufacturer) { infos.push(Device.manufacturer); }
                        this.createNewUser(Device.uuid ? Device.uuid : 'defaultweb00', infos).then(
                            user => resolve(user),
                            error => reject(error)
                        );
                    }
                )
            );
        });
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
        return this.updateUser(user);
    }
}




