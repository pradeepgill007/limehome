import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    HotelInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: environment.applicationKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
