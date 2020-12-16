/**
 * @desc this is the hotel details component of the application to display name, address of the hotels
 * @author Pradeep Gill pradeepgill713@gmail.com
 */
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HotelInfo } from '../app-interface/';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HotelInfoComponent  {

  @Output() changeMapMarkerEvent = new EventEmitter<number>();
  @ViewChild('hotelInfoCarousel') hotelInfoCarousel: any;
  @Input() hotelInfo: HotelInfo[] = [];
  @Input() error: string = '';

  showNavigationIndicators = false;

  slideActivate(activeSlideId: number) {
    this.hotelInfoCarousel.select(`slideId-${activeSlideId}`);
  }

  onSlide(event: any) {
    const imageIndex = parseInt(event.current.replace("slideId-", ""), 10);
    this.changeMapMarkerEvent.next(imageIndex);
  }
}
