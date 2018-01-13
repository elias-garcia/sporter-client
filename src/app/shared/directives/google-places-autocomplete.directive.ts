import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { GeolocationService } from '../../core/services/geolocation.service';
import { } from '@types/googlemaps';

@Directive({
  selector: '[appGooglePlacesAutocomplete]'
})
export class GooglePlacesAutocompleteDirective implements OnInit {

  @Output() pickPlace = new EventEmitter<google.maps.places.PlaceResult>();

  constructor(
    private element: ElementRef,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    if (this.checkIfMapsLibraryIsLoaded()) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.element.nativeElement,
        {}
      );

      autocomplete.addListener('place_changed', () => {
        this.pickPlace.emit(autocomplete.getPlace());
      });

      this.geolocationService.getCurrentLocation().subscribe(
        (position: Position) => {
          const bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

          autocomplete.setBounds(bounds);
        }
      );
    }

  }
  checkIfMapsLibraryIsLoaded() {
    return typeof google === 'object' && typeof google.maps === 'object';
  }

}
