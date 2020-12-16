/**
 * @desc this is the map component of the application to display the map
 * @author Pradeep Gill pradeepgill713@gmail.com
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Marker } from '../app-interface/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{

  // center of the map
  @Input() center: any = { lat: 0, lng: 0 };

  // market positions of the map
  @Input() mapMarkers: Marker[] = [];

  @Output() sliderSlideIndexEvent: EventEmitter<number> = new EventEmitter<number>();

  // zoom level of the map
  zoom = 15;

  slideSlider(index: number) {
    this.sliderSlideIndexEvent.emit(index);
  }
}
