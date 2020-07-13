import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearproductoform',
  templateUrl: './crearproductoform.component.html'
})
export class CrearproductoformComponent implements OnInit {
  titulo = 'Crear Producto';
  public producto: Producto = new Producto();

  constructor(private productoService: ProductoService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();

  }

  create(): void {
    this.productoService.createProducto(this.producto).subscribe(
      json => {
        this.router.navigate(['/productos'])
        Swal.fire('Nuevo producto ', `${json.nombre} agregado con exito!`, 'success')
      }
    );
  }

  updateProducto(): void{
    this.productoService.updateProducto(this.producto).subscribe(
      json => {
        this.router.navigate(['/productos'])
        Swal.fire('Producto Actualizado', `${json.mensaje}: ${json.producto.nombre}!`, 'success')
      }
    );
  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['productoId'];
      
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
      }
    });
  }
}
