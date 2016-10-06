import { Component } from '@angular/core';

import { Chart } from './chart/chart.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    viewProviders: [Chart]
})
export class AppComponent {
    constructor () {
    }
 }
