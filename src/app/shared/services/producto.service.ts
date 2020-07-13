import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient, private router: Router) {}

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
          return producto;
        });
        return response;
      })
    );
  }

  getProducto(id): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  createProducto(producto: Producto): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, producto).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  updateProducto(producto: Producto): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`,producto).pipe(
      catchError(e =>{
        this.router.navigate(['/productos']);
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData,{
      reportProgress: true
    });
    return this.http.request(req);
  }
}
