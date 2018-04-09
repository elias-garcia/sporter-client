import { Pipe, PipeTransform } from '@angular/core';
import { NotificationType } from '../../core/components/navbar/notification-type.enum';

@Pipe({
  name: 'notificationTypePipe'
})
export class NotificationTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case NotificationType.JOIN_EVENT:
        return 'Un usuario se ha apuntado a tu evento';
      case NotificationType.EVENT_FULL:
        return 'Un evento se ha completado';
      case NotificationType.NEW_RATING:
        return 'Has recibido una nueva valoración';
      case NotificationType.NEW_MESSAGE:
        return 'Tienes nuevos mensajes sin leer';
    }
  }

}
