import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SportService } from '../../../core/services/sport.service';
import { Sport } from '../../../shared/models/sport.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EventSearchData } from './event-search-data';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-events-searcher',
  templateUrl: './events-searcher.component.html',
  styleUrls: ['./events-searcher.component.scss']
})
export class EventsSearcherComponent implements OnInit {

  @Input() public searchData: EventSearchData = {
    location: '',
    startDate: '',
    sportId: null
  };
  @Input() public isSendingRequest = false;
  @Output() public fillSearchForm = new EventEmitter<EventSearchData>();

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  public sports: Sport[] = [];
  public searchEventsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sportService: SportService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSports();
  }

  createForm() {
    this.searchEventsForm = this.fb.group({
      location: [this.searchData.location, Validators.required],
      startDate: [this.searchData.startDate, Validators.required],
      sportId: [this.searchData.sportId]
    });
  }

  getSports() {
    this.sportService.getSports().subscribe(
      (res: any) => {
        this.sports = res.data.sports;
      }
    );
  }

  onPickPlace() {
    this.location.patchValue(this.autocompleteInput.nativeElement.value);
  }

  onPickDate(date: string) {
    this.startDate.patchValue(date);
  }

  onSubmit() {
    const searchData: EventSearchData = {};

    Object.keys(searchData)
      .filter(key => searchData[key] !== 'null')
      .map(key => searchData[key] = searchData[key]);

    this.fillSearchForm.emit(this.searchEventsForm.value);
  }

  get location() {
    return this.searchEventsForm.get('location');
  }

  get startDate() {
    return this.searchEventsForm.get('startDate');
  }

  get sportId() {
    return this.searchEventsForm.get('sportId');
  }

}
