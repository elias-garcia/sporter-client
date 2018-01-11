import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportService } from '../../core/services/sport.service';
import { EventIntensityService } from '../../core/services/event-intensity.service';
import { Sport } from '../../shared/models/sport.model';
import { validateInteger } from '../../shared/validators/integer.validator';

const MIN_PLAYERS = 2;

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  public minPlayers = MIN_PLAYERS;
  public newEventForm: FormGroup;
  public sports: Sport[] = [];
  public eventIntensities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sportService: SportService,
    private eventIntensityService: EventIntensityService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSports();
    this.getEventIntensities();
  }

  createForm() {
    this.newEventForm = this.fb.group({
      name: ['', Validators.required],
      sport: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      intensity: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endingDate: ['', Validators.required],
      endingTime: ['', Validators.required],
      maxPlayers: [MIN_PLAYERS, [Validators.required, Validators.min(MIN_PLAYERS), validateInteger]],
      fee: ['', Validators.required],
    });
  }

  getSports() {
    this.sportService.getSports().subscribe(
      (sports: Sport[]) => {
        this.sports = sports;
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

  }

  onPickDate() {

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
    return this.newEventForm.get('startDate');
  }

  get startTime() {
    return this.newEventForm.get('startTime');
  }

  get endingDate() {
    return this.newEventForm.get('startTime');
  }

  get endingTime() {
    return this.newEventForm.get('startTime');
  }

  get maxPlayers() {
    return this.newEventForm.get('maxPlayers');
  }

  get fee() {
    return this.newEventForm.get('fee');
  }

}
