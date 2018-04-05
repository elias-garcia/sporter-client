import { Pipe, PipeTransform } from '@angular/core';
import { EventStatus } from '../../events/event-status.enum';

@Pipe({
  name: 'eventStatus'
})
export class EventStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case EventStatus.CANCELED:
        return 'Cancelado';
      case EventStatus.CONFIRMED:
        return 'Confirmado';
      case EventStatus.DISPUTING:
        return 'En disputa';
      case EventStatus.FINISHED:
        return 'Finalizado';
      case EventStatus.FULL:
        return 'Completo';
      case EventStatus.WAITING:
        return 'Esperando jugadores';
    }
  }

}
