import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  titulo = "Signup details";
  public usuario: Usuario = new Usuario();


  constructor(private signupService: SignupService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado!`,'info')
      this.router.navigate(['/quiensoy']);
    }
  }
  
  signUp(): void{
    this.signupService.createUsuario(this.usuario).subscribe(
      json => {
        this.router.navigate(['/quiensoy']);
        Swal.fire('Nuevo usuario ', `${json.usuario.username} agregado con exito!`, 'success');
      }
    );
  }

}
