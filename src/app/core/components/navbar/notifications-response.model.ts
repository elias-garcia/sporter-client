import { Notification } from '../../../shared/models/notification.model';

export interface NotificationsResponse {
  notifications: Notification[];
  unread: number;
}
