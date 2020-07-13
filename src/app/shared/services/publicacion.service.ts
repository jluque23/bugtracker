import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private urlEndPoint: string = 'http://localhost:8080/api/publicaciones';

  constructor(private http: HttpClient, private router: Router) { }

  getPublicaciones(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Publicacion[]).map(producto => {
          return producto;
        });
        return response;
      })
    );
  }

  getPublicacion(id): Observable<Publicacion>{
    return this.http.get<Publicacion>(`${this.urlEndPoint}/${id}`);
  }

}
