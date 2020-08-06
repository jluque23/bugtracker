import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BugNotification } from '../models/bugnotification';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private urlEndPoint = `${URL_BACKEND}/api/notifications`;
  // private urlEndPoint = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<BugNotification[]> {
    return this.http.get<BugNotification[]>(this.urlEndPoint).pipe(
      map((response: any) => {
        (response as BugNotification[]).map(notif => {
          return notif;
        });
        return response;
      })
    );
  }

  newNotification(notification: BugNotification): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, notification).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
