import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Producto } from 'src/app/shared/models/producto';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})
export class DetalleproductoComponent implements OnInit {
  @Input() producto: Producto;

  titulo = "Detalle del producto";
  fotoSeleccionada: File;
  progreso = 0;

  constructor(public modalService: ModalService, private productoService: ProductoService,public authService: AuthService) { }

  ngOnInit(): void {

  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen :', 'El archivo debe ser una imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload:', 'Debe seleccionar una foto', 'error');
    } else {
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.producto = response.producto as Producto;
            this.modalService.notificarUpload.emit(this.producto);
            Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con exito: ${this.producto.foto}`, 'success');
            this.fotoSeleccionada = null;
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
