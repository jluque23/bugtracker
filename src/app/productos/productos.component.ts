import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../shared/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../shared/models/producto';
import { ModalService } from '../shared/services/modal.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.productoService.getProductos(page).subscribe(response => {
        this.productos = response.content as Producto[];
        this.paginador = response;
      });
    });

    this.modalService.notificarUpload.subscribe(producto => {
      this.productos = this.productos.map(productoOriginal => {
        if (producto.id == productoOriginal.id) {
          productoOriginal.foto = producto.foto;
        }
        return productoOriginal;
      })
    })
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }
}
