import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker, HotelInfo } from './app-interface/';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(HotelInfoComponent) child: any;

  center: any = { lat: 52.5200, lng: 13.4050 };
  iconHomeActive: string = "/assets/design_assets_home-icon-active.svg";
  iconHome: string = "/assets/design_assets_home-icon.svg";
  mapMarkers: Marker[] = [];
  error: string = '';
  hotelInfo: HotelInfo[] = [];
  loading: boolean = true;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getPosition().then(pos => {
      this.center.lat = pos.lng;
      this.center.lat = pos.lat;
      this.getHotels();
    });
    this.getHotels();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getHotels() {
    this.loading = true;
    this.hotelInfo = [];
    this.mapMarkers = [];
    this.httpClient.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.center.lat},${this.center.lng}&radius=1500&type=hotels&radius=500&key=AIzaSyBJKll2_6dcmjzCUSEIGXz2CAZlHaGv4S0`).subscribe((data: any) => {

      this.loading = false;
      if (data.status === 'OK') {
        data.results.forEach((data: any, index: number) => {

          const hptelInfoData: HotelInfo = {
            name: data.name,
            vicinity: data.vicinity,
            rating: data.rating || 0,
            user_ratings_total: data.user_ratings_total || 0,
            photo_reference: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${data.photos[0].photo_reference}&maxwidth=1000&key=AIzaSyBJKll2_6dcmjzCUSEIGXz2CAZlHaGv4S0`
          };

          const mapMarkerData: Marker = {
            position: data.geometry.location,
            options: {
              icon: index === 0 ? this.iconHomeActive : this.iconHome
            }
          }

          this.hotelInfo.push(hptelInfoData);
          this.mapMarkers.push(mapMarkerData);
        });
        alert('done');
      } else {
        this.error = data.error_message || 'Not able to load hotels';
      }
    })
  }

  changeMapMarker(index: number) {
    this.sliderSlideIndex(index)
  }

  sliderSlideIndex(index: number) {
    this.mapMarkers.forEach((mapMarker: Marker, i: number) => {
      if (i === index) {
        mapMarker.options.icon = this.iconHomeActive;
      } else {
        mapMarker.options.icon = this.iconHome;
      }
    });
    
    this.child.slideActivate(index);

    // change the lat value for center
    const changeLat = {...this.mapMarkers[index].position};
    changeLat.lat = changeLat.lat - 0.005;
    this.center = changeLat;
  }
}
