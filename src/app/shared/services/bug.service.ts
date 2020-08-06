import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Bug } from '../models/bug';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private urlEndPoint = 'http://localhost:8080/api/bugs';

  constructor(private http: HttpClient, private router: Router) { }

  getBugs(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Bug[]).map(bug => {
          return bug;
        });
        return response;
      })
    );
  }

  createBug(bug: Bug): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, bug).pipe(
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

  getBug(id): Observable<Bug> {
    return this.http.get<Bug>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          Swal.fire('Inexistent Bug!', `${e.error.mensaje}!`, 'error').then((result) => {
            if (result.value) {
              this.router.navigate(['/openedbugs']);
            }
          });
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  updateBug(bug: Bug): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${bug.id}`, bug).pipe(
      catchError(e => {
        this.router.navigate(['/openedbugs']);
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  totalBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.urlEndPoint).pipe(
      map((response: any) => {
        (response as Bug[]).map(bug => {
          return bug;
        });
        return response;
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
