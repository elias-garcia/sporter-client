import { TestBed, inject } from '@angular/core/testing';

import { EventIntensityService } from './event-intensity.service';

describe('EventIntensityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventIntensityService]
    });
  });

  it('should be created', inject([EventIntensityService], (service: EventIntensityService) => {
    expect(service).toBeTruthy();
  }));
});
