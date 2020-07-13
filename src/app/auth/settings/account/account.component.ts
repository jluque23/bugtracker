import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupService } from 'src/app/shared/services/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  usuario: Usuario = new Usuario();

  username = this.authService.usuario.username;

  constructor(private authService: AuthService,
              private signUpService: SignupService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }
  
  obtenerUsuario():void{
    if(this.username != null){
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
