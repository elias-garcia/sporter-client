import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportService } from '../../core/services/sport.service';
import { EventIntensityService } from '../../core/services/event-intensity.service';
import { Sport } from '../../shared/models/sport.model';
import { validateInteger } from '../../shared/validators/integer.validator';
import { HttpResponse } from '@angular/common/http';
import { getLocaleCurrencySymbol } from '@angular/common';
import { validateDates } from '../../shared/validators/dates.validator';
import { EventService } from '../../core/services/event.service';
import { EventRequest } from '../event-data';
import { GeolocationService } from '../../core/services/geolocation.service';
import { } from '@google/types';
import * as moment from 'moment';

const MIN_FEE = 0;
const MIN_PLAYERS = 2;

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  public minFee = MIN_FEE;
  public minPlayers = MIN_PLAYERS;
  public newEventForm: FormGroup;
  public sports: Sport[] = [];
  public eventIntensities: string[] = [];
  public currencyLocaleSymbol: string;
  public isSendingRequest = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: FormBuilder,
    private sportService: SportService,
    private eventIntensityService: EventIntensityService,
    private geolocationService: GeolocationService,
    private eventService: EventService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSports();
    this.getEventIntensities();
    this.getCurrencyLocaleSymbol();
  }

  getCurrencyLocaleSymbol() {
    this.currencyLocaleSymbol = getLocaleCurrencySymbol(this.locale);
  }

  createForm() {
    this.newEventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      dates: this.fb.group({
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endingDate: ['', Validators.required],
        endingTime: ['', Validators.required]
      }, { validator: validateDates }),
      description: ['', Validators.required],
      sport: ['', Validators.required],
      intensity: ['', Validators.required],
      fee: [MIN_FEE, [Validators.required, Validators.min(0)]],
      maxPlayers: [MIN_PLAYERS, [Validators.required, Validators.min(MIN_PLAYERS), validateInteger]]
    });
  }

  getSports() {
    this.sportService.getSports().subscribe(
      (res: any) => {
        this.sports = res.data.sports;
      }
    );
  }

  getEventIntensities() {
    return this.eventIntensityService.getEventIntensities().subscribe(
      (eventIntensities: string[]) => {
        this.eventIntensities = eventIntensities;
      }
    );
  }

  onPickPlace() {
    this.location.patchValue(this.autocompleteInput.nativeElement.value);
  }

  onPickStartDate(startDate: string) {
    this.startDate.patchValue(startDate);
  }

  onPickEndingDate(endingDate: string) {
    this.endingDate.patchValue(endingDate);
  }

  onPickStartTime(startTime: string) {
    this.startTime.patchValue(startTime);
  }

  onPickEndingTime(endingTime: string) {
    this.endingTime.patchValue(endingTime);
  }

  onSubmit() {
    this.isSendingRequest = true;

    const startDate = moment(this.startDate.value, 'L');
    const endingDate = moment(this.endingDate.value, 'L');

    startDate.hour(this.startTime.value.split(':')[0]);
    startDate.minutes(this.startTime.value.split(':')[1]);

    endingDate.hour(this.endingTime.value.split(':')[0]);
    endingDate.minutes(this.endingTime.value.split(':')[1]);

    this.geolocationService.geocodeAddress(this.location.value).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          const eventData: EventRequest = {
            name: this.name.value,
            location: [results[0].geometry.location.lat(), results[0].geometry.location.lng()],
            startDate: startDate.toISOString(true),
            endingDate: endingDate.toISOString(true),
            description: this.description.value,
            sport: this.sport.value,
            intensity: this.intensity.value,
            fee: this.fee.value,
            maxPlayers: this.maxPlayers.value
          };

          this.eventService.createEvent(eventData).subscribe(
            (res: any) => {
              console.log(res);
            }
          );
        } else {
          this.isSendingRequest = false;
          this.location.setErrors({ invalidLocation: true });
          this.cd.detectChanges();
        }
      }
    );
  }

  get name() {
    return this.newEventForm.get('name');
  }

  get location() {
    return this.newEventForm.get('location');
  }

  get startDate() {
    return this.newEventForm.get('dates.startDate');
  }

  get startTime() {
    return this.newEventForm.get('dates.startTime');
  }

  get endingDate() {
    return this.newEventForm.get('dates.endingDate');
  }

  get endingTime() {
    return this.newEventForm.get('dates.endingTime');
  }

  get description() {
    return this.newEventForm.get('description');
  }

  get sport() {
    return this.newEventForm.get('sport');
  }

  get intensity() {
    return this.newEventForm.get('intensity');
  }

  get fee() {
    return this.newEventForm.get('fee');
  }

  get maxPlayers() {
    return this.newEventForm.get('maxPlayers');
  }

}
