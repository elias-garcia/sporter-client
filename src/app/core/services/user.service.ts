import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { LoginData } from '../../login/login-data.model';
import { RegisterData } from '../../register/register-data.model';
import * as moment from 'moment';
import { RatingData } from '../../users/rating-data';
import { PasswordData } from '../../users/password-data';
import { UserInfoData } from '../../users/user-info-data';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  logIn(payload: LoginData): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/sessions`, payload);
  }

  register(payload: RegisterData): Observable<Object> {
    const payloadCopy = Object.assign({}, payload);

    payloadCopy.birthdate = moment(payload.birthdate, 'L').format('YYYY-MM-DD');

    return this.http.post(`${environment.apiUrl}/users`, payloadCopy);
  }

  changePassword(userId: string, payload: PasswordData) {
    return this.http.patch(`${environment.apiUrl}/users/${userId}`, payload);
  }

  sendPasswordResetEmail(email: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/password-reset-token`, { email });
  }

  getUserDetails(userId: string): Observable<Object> {
    return this.http.get(`${environment.apiUrl}/users/${userId}`);
  }

  updateUserDetails(userId: string, payload: UserInfoData): Observable<Object> {
    const payloadCopy = Object.assign({}, payload);

    payloadCopy.birthdate = moment(payload.birthdate, 'L').format('YYYY-MM-DD');

    return this.http.put(`${environment.apiUrl}/users/${userId}`, payloadCopy);
  }

  getUserRatings(userId: string): Observable<Object> {
    return this.http.get(`${environment.apiUrl}/users/${userId}/ratings`);
  }

  createRating(userId: string, ratingData: RatingData): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/users/${userId}/ratings`, ratingData);
  }

  updateRating(userId: string, ratingId: string, ratingData: RatingData): Observable<Object> {
    return this.http.put(`${environment.apiUrl}/users/${userId}/ratings/${ratingId}`, ratingData);
  }

  deleteRating(userId: string, ratingId: string, ratingData: RatingData): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/users/${userId}/ratings/${ratingId}`);
  }

}
