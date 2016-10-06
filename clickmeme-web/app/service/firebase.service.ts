import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';

declare var firebase: any;

@Injectable()
export class FirebaseService {
    getUsers(): Promise<any> {
        return firebase.database().ref('/users').once('value');
    }

    registrerForUpdate(): Observable<User[]> {
        return new Observable((observer: Observer<User[]>) => {
            firebase.database().ref('/users').on('value', function (datas: any) {
                var users: User[] = [];
                datas.forEach(function (user: any) {
                    var userInfo: any = user.val();
                    users.push(new User(userInfo.deviceId, userInfo.pseudo, userInfo.points, userInfo.avatar, userInfo.minTime, userInfo.click));
                });
                observer.next(users);
            });
        });

    }
}