import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import { ModalService } from '../shared/services/modal.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService, 
              private activatedRoute: ActivatedRoute, 
              private modalService: ModalService, 
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    });

    this.modalService.notificarUpload.subscribe( cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id== clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
  }


  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito`,
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
          'El cliente no se ha eliminado',
          'error'
        )
      }
    })
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
