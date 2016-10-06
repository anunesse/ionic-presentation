import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FirebaseService } from './service/firebase.service';

import { AppComponent }  from './app.component';
import { Chart }  from './chart/chart.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, Chart ],
  bootstrap: [ AppComponent ],
  providers: [FirebaseService]
})
export class AppModule { }
