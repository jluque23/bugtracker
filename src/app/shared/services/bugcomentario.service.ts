import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bugcomentario } from '../models/bugcomentario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class BugcomentarioService {

  private urlEndPoint = `${URL_BACKEND}/api/comentariosbug`;
  // private urlEndPoint = 'http://localhost:8080/api/comentariosbug';

  constructor(private http: HttpClient) { }

  newComentarioBug(bugComentario: Bugcomentario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, bugComentario).pipe(
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

  getBugComentarios(id: number): Observable<Bugcomentario[]> {
    return this.http.get<Bugcomentario[]>(`${this.urlEndPoint}/${id}`).pipe(
      map((response: any) => {
        (response as Bugcomentario[]).map(bugcomentario => {
          return bugcomentario;
        });
        return response;
      })
    );
  }
}
