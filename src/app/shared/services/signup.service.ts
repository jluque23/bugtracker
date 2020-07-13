import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuario(id): Observable<any> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  getUsuarioByUsername(username): Observable<any>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/find-by-user/${username}`)
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario).pipe(
      catchError(e => {
        if (e.status == 400) {
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
        this.router.navigate(['/TODO'])
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

}
