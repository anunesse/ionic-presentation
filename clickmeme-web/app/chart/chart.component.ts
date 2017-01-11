import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';
import { FirebaseService } from '../service/firebase.service';

declare var Highcharts: any;

@Component({
    moduleId: module.id,
    selector: 'chart',
    templateUrl: '/app/chart/chart.component.html'
})
export class Chart implements OnInit {
    chart: any = null;
    users: User[] = [];

    constructor(private firebaseService: FirebaseService, private _ngZone: NgZone) {
    }

    ngOnInit() {
        var observable: Observable<User[]> = this.firebaseService.registrerForUpdate();
        observable.subscribe(users => {
            this.onDatas(users);
        });
    }

    onDatas(users: User[]): void {        
        var datas: any[] = [];

        for(var i = 0; i < users.length; i++) {
            datas.push([JSON.stringify({pseudo: users[i].pseudo, avatar: users[i].avatar}), users[i].points]);
        }

        this._ngZone.run(() => {
            this.users = users;
            this.users.sort((u1,u2) => u2.points - u1.points);
        });       

        if (this.chart == null) {
            this.chart = Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Scores'
                },
                xAxis: {
                    type: 'category',
                    useHTML: true,
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            var user = JSON.parse(this.value);
                            return '<p class="text-center;"><br/><img style="height:80px; width:80px;" src="' 
                            + (user.avatar ? 'app/img/' + user.avatar : 'http://placehold.it/80x80') 
                            + '" class="img-rounded"/><br/><br/>' + (user.pseudo ? user.pseudo : 'John DOE') + '</p>';
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Points'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                series: [{
                    name: 'Points',
                    colorByPoint: true,
                    data: datas,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        }
        else {
            this.chart.series[0].setData(datas);
        }
    }
}