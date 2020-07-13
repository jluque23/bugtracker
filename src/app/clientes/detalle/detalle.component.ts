import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FacturaService } from 'src/app/shared/services/factura.service';
import { Factura } from 'src/app/shared/models/factura';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;

  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService, public modalService: ModalService, public authService: AuthService
    , public facturaService: FacturaService) { }

  ngOnInit(): void { }

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
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con exito: ${this.cliente.foto}`, 'success');
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

  deleteFactura(factura: Factura): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.deleteFactura(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
            swalWithBootstrapButtons.fire(
              'Factura eliminada!',
              `Factura ${factura.descripcion} eliminada con exito`,
              'success'
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La factura no se ha eliminado',
          'error'
        )
      }
    })
  }
}
