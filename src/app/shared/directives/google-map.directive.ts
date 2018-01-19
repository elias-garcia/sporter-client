import { Directive, OnChanges, SimpleChanges, Input, ElementRef, HostListener } from '@angular/core';
import { } from '@types/google';

const ZOOM = 17;

@Directive({
  selector: '[appGoogleMap]'
})
export class GoogleMapDirective implements OnChanges {

  @Input() coordinates: [number, number];

  private map: google.maps.Map;

  constructor(
    private element: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.coordinates.currentValue && !changes.coordinates.previousValue) {
      this.initializeMap();
    }
  }

  initializeMap() {
    const latLng: google.maps.LatLngLiteral = { lat: this.coordinates[0], lng: this.coordinates[1] };
    const mapOptions: google.maps.MapOptions
      = { zoom: ZOOM, center: latLng };

    this.map = new google.maps.Map(this.element.nativeElement, mapOptions);

    const markerOptions: google.maps.MarkerOptions = { position: latLng, map: this.map };
    const marker = new google.maps.Marker(markerOptions);
  }

  @HostListener('window:resize', [''])
  centerMapOnWindowResize() {
    if (this.map) {
      const center: google.maps.LatLng = this.map.getCenter();

      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter(center);
    }
  }

}
