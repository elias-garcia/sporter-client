import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventIntensity'
})
export class EventIntensityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'HIGH':
        return 'Alta';
      case 'MEDIUM':
        return 'Media';
      case 'LOW':
        return 'Baja';
    }
  }

}
