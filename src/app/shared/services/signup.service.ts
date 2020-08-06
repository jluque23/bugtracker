import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError, map } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private urlEndPoint = `${URL_BACKEND}/api/usuarios`;
  // private urlEndPoint = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Usuario[]).map(usuario => {
          return usuario;
        });
        return response;
      })
    );
  }

  getUsuario(id): Observable<any> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  getUsuarioByUsername(username): Observable<any> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/find-by-user/${username}`);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario).pipe(
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

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
      catchError(e => {
        this.router.navigate(['/TODO']);
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/TODO']);
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  makeUserAdmin(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/makeadmin`, usuario).pipe(
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
