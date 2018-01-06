import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SportService } from '../../../core/services/sport.service';
import { Sport } from '../../../shared/models/sport.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-events-searcher',
  templateUrl: './events-searcher.component.html',
  styleUrls: ['./events-searcher.component.scss']
})
export class EventsSearcherComponent implements OnInit {

  public sports: Sport[] = [];
  public searchEventsForm: FormGroup;

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sportService: SportService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSports();
    this.searchEventsForm.get('location').valueChanges.subscribe(
      (data: any) => {
        this.coordinates.patchValue('');
      }
    );
  }

  createForm() {
    this.searchEventsForm = this.fb.group({
      location: ['', Validators.required],
      coordinates: ['', Validators.required],
      date: [''],
      sport: ['', Validators.required]
    });
  }

  getSports() {
    this.sportService.getSports().subscribe(
      (res: any) => {
        this.sports = res.data.sports;
      }
    );
  }

  onPickPlace(place: google.maps.places.PlaceResult) {
    if (place.geometry) {
      this.location.patchValue(this.autocompleteInput.nativeElement.value);
      this.coordinates.patchValue({ lat: place.geometry.location.lat(), lng: place.geometry.location.lat() });
      this.changeDetectorRef.detectChanges();
    }
  }

  onSubmit() {
    console.log(this.searchEventsForm.value);
  }

  onPickDate(date: string) {
    this.date.patchValue(date);
  }

  get location() {
    return this.searchEventsForm.get('location');
  }

  get coordinates() {
    return this.searchEventsForm.get('coordinates');
  }

  get date() {
    return this.searchEventsForm.get('date');
  }

  get sport() {
    return this.searchEventsForm.get('sport');
  }

}
