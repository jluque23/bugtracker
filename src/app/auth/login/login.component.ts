import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Sign In';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacias!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/quiensoy']);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con exito`, 'success');
    }, err => {
      if(err.status==400){
        Swal.fire('Login', 'Usuario o clave incorrectas!', 'error');
      }
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado!`,'info')
      this.router.navigate(['/quiensoy']);
    }
  }

}
