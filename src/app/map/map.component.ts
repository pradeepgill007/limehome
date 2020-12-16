import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker } from '../app-interface/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{

  @Input() center: any = { lat: 0, lng: 0 };
  @Input() mapMarkers: Marker[] = [];

  @Output() sliderSlideIndexEvent: EventEmitter<number> = new EventEmitter<number>();

  zoom = 15;

  slideSlider(index: number) {
    this.sliderSlideIndexEvent.emit(index);
  }
}
