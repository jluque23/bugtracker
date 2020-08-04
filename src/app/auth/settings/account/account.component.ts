import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupService } from 'src/app/shared/services/signup.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  usuario: Usuario = new Usuario();
  fotoSeleccionada: File;
  progreso = 0;

  username = this.authService.usuario.username;

  constructor(private authService: AuthService,
              private signUpService: SignupService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    if (this.username != null) {
      this.signUpService.getUsuarioByUsername(this.username).subscribe((usuario) => this.usuario = usuario);
    }
  }

  updateAccount(): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¿Seguro que desea actualizar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.signUpService.updateUsuario(this.usuario).subscribe(
          json => {
            Swal.fire('Usuario ', `${json.usuario.username} actualizado con exito!`, 'success');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El usuario no se ha actualizado', 'error');
      }
    });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen :', 'El archivo debe ser una imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload:', 'Debe seleccionar una foto', 'error');
    } else {
      this.signUpService.subirFoto(this.fotoSeleccionada, this.usuario.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.usuario = response.cliente as Usuario;
            window.location.reload(false);
          }
        });
    }
  }
}
