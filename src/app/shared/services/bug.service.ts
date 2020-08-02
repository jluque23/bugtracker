import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Bug } from '../models/bug';
import { map, catchError } from 'rxjs/operators';

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
          this.router.navigate(['/openedbugs']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  updateBug(bug: Bug): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${bug.id}`, bug).pipe(
      catchError(e =>{
        this.router.navigate(['/productos']);
        if(e.error.mensaje){
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
}
