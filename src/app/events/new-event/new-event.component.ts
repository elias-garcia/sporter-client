import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getLocaleCurrencySymbol } from '@angular/common';
import { Router } from '@angular/router';
import { SportService } from '../../core/services/sport.service';
import { EventIntensityService } from '../../core/services/event-intensity.service';
import { Sport } from '../../shared/models/sport.model';
import { validateInteger } from '../../shared/validators/integer.validator';
import { validateDates } from '../../shared/validators/dates.validator';
import { EventService } from '../../core/services/event.service';
import { DatetimeService } from '../../core/services/datetime.service';
import { EventRequest } from '../event-data';
import { GeolocationService } from '../../core/services/geolocation.service';
import { validateDate } from '../../shared/validators/date.validator';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { } from '@google/types';
import * as moment from 'moment';

const MIN_FEE = 0;
const MIN_PLAYERS = 2;
const EVENT_CREATED_MESSAGE = 'El evento ha sido creado con éxito!';

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
    private datetimeService: DatetimeService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private router: Router
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
      datesGroup: this.fb.group({
        startDateGroup: this.fb.group({
          startDate: ['', Validators.required],
          startTime: ['', Validators.required]
        }, { validator: validateDate }),
        endingDateGroup: this.fb.group({
          endingDate: ['', Validators.required],
          endingTime: ['', Validators.required]
        })
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

  handleInvalidLocationError() {
    this.isSendingRequest = false;
    this.location.setErrors({ invalidLocation: true });
    this.cd.detectChanges();
  }

  onSubmit() {
    this.isSendingRequest = true;

    this.geolocationService.geocodeAddress(this.location.value).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          const eventData: EventRequest = {
            name: this.name.value,
            location: [results[0].geometry.location.lat(), results[0].geometry.location.lng()],
            startDate: this.datetimeService.convertDateAndTimeToISOString(this.startDate.value, this.startTime.value),
            endingDate: this.datetimeService.convertDateAndTimeToISOString(this.endingDate.value, this.endingTime.value),
            description: this.description.value,
            sport: this.sport.value,
            intensity: this.intensity.value,
            fee: this.fee.value,
            maxPlayers: this.maxPlayers.value
          };

          this.eventService.createEvent(eventData).subscribe(
            (res: any) => {
              this.alertService.createAlert({ message: EVENT_CREATED_MESSAGE, type: AlertType.Success });
              this.router.navigate(['events', res.data.event.id]);
            }
          );
        } else {
          this.handleInvalidLocationError();
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
    return this.newEventForm.get('datesGroup.startDateGroup.startDate');
  }

  get startTime() {
    return this.newEventForm.get('datesGroup.startDateGroup.startTime');
  }

  get endingDate() {
    return this.newEventForm.get('datesGroup.endingDateGroup.endingDate');
  }

  get endingTime() {
    return this.newEventForm.get('datesGroup.endingDateGroup.endingTime');
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
