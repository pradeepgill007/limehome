/**
 * @desc this is the root component of the application
 * @author Pradeep Gill pradeepgill713@gmail.com
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker, HotelInfo } from './app-interface/';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(HotelInfoComponent) child: any;

  // default center of the map
  center: any = { lat: 52.5200, lng: 13.4050 };

  // map active hotel icon
  iconHomeActive: string = "/assets/design_assets_home-icon-active.svg";

  //  map  hotel icon
  iconHome: string = "/assets/design_assets_home-icon.svg";

  //  hotel positions
  mapMarkers: Marker[] = [];

  // server error string
  error: string = '';

  // hotel detailed information
  hotelInfo: HotelInfo[] = [];
  loading: boolean = true;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    // access the user current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resp => {
        this.center.lat = resp.coords.latitude;
        this.center.lng = resp.coords.longitude;
        this.getHotelsNearBy();
        alert(1);
      }, (err) => {
          this.getHotelsNearBy();
          alert(2);
        },{ timeout: 2500, enableHighAccuracy: true });
    } else {
      this.getHotelsNearBy();
      alert(3);
    }
  }

   /**
   * @desc this function will get the list of hotels near you within the radius of 500
   * 
   */
  getHotelsNearBy() {

    this.loading = true;

    this.httpClient.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.center.lat},${this.center.lng}&radius=1500&type=hotels&radius=500&key=${environment.applicationKey}`).subscribe((data: any) => {
      this.loading = false;
      if (data.status === 'OK') {
        data.results.forEach((data: any, index: number) => {

          const hptelInfoData: HotelInfo = {
            name: data.name,
            vicinity: data.vicinity,
            rating: data.rating || 0,
            user_ratings_total: data.user_ratings_total || 0,
            photo_reference: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${data.photos[0].photo_reference}&maxwidth=1000&key=${environment.applicationKey}`
          };

          const mapMarkerData: Marker = {
            position: data.geometry.location,
            options: {
              icon: index === 0 ? this.iconHomeActive : this.iconHome
            }
          }

          this.hotelInfo.push(hptelInfoData);
          this.mapMarkers.push(mapMarkerData);
          this.setMapCenter(this.mapMarkers, 0);
        });

      } else {
        this.error = data.error_message || 'Not able to load hotels';
      }
    })
  }

 /**
   * @desc this function will change active hotel icon and slide the slider to provied index
   *
   * @parms index       index of hotel info
   */
  changeMapMarker(index: number) {
    this.sliderSlideIndex(index)
  }

  /**
   * @desc this function will slide the slider to provied index.
   * Change active hotel icon and set the map new center
   *
   * @parms index       index of hotel marker
   */
  sliderSlideIndex(index: number) {
    this.mapMarkers.forEach((mapMarker: Marker, i: number) => {
      if (i === index) {
        mapMarker.options.icon = this.iconHomeActive;
      } else {
        mapMarker.options.icon = this.iconHome;
      }
    });
    
    this.child.slideActivate(index);
    this.setMapCenter(this.mapMarkers, index);
  }

  setMapCenter(mapMarkers: Marker[], index: number) {
     // change the lat value for center
     const changeLat = {...mapMarkers[index].position};
     changeLat.lat = changeLat.lat - 0.005;
     this.center = changeLat;
  }
}
