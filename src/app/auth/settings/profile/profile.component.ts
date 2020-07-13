import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/shared/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  usuario: Usuario = new Usuario();

  username = this.authService.usuario.username;
  
  constructor(private signUpService: SignupService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(): void{
    if (this.username != null) {
      this.signUpService.getUsuarioByUsername(this.username).subscribe((usuario) => this.usuario = usuario)
    }
  }

  updateAccount(): void{
    Swal.fire({
      title: 'Estas seguro?',
      text: '¿Seguro que desea actualizar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true      
    }).then((result) => {
      if(result.value){
        this.signUpService.updateUsuario(this.usuario).subscribe(
          json => {
            Swal.fire('Usuario ', `${json.usuario.username} actualizado con exito!`, 'success');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel){
        Swal.fire('Cancelado', 'El usuario no se ha actualizado','error');
      }
    })
  }

}
