import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportService } from '../../core/services/sport.service';
import { EventIntensityService } from '../../core/services/event-intensity.service';
import { Sport } from '../../shared/models/sport.model';
import { validateInteger } from '../../shared/validators/integer.validator';
import { HttpResponse } from '@angular/common/http';
import { getLocaleCurrencySymbol } from '@angular/common';

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

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: FormBuilder,
    private sportService: SportService,
    private eventIntensityService: EventIntensityService
  ) { }

  ngOnInit() {
    console.log(this.locale);
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
      sport: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      intensity: ['', Validators.required],
      dates: this.fb.group({
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endingDate: ['', Validators.required],
        endingTime: ['', Validators.required]
      }),
      maxPlayers: [MIN_PLAYERS, [Validators.required, Validators.min(MIN_PLAYERS), validateInteger]],
      fee: ['jaj', [Validators.required, Validators.min(0)]],
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

  get name() {
    return this.newEventForm.get('name');
  }

  get sport() {
    return this.newEventForm.get('sport');
  }

  get description() {
    return this.newEventForm.get('description');
  }

  get location() {
    return this.newEventForm.get('location');
  }

  get intensity() {
    return this.newEventForm.get('intensity');
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

  get maxPlayers() {
    return this.newEventForm.get('maxPlayers');
  }

  get fee() {
    return this.newEventForm.get('fee');
  }

}
