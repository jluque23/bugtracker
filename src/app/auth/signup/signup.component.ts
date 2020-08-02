import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BugNotification } from 'src/app/shared/models/bugnotification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  titulo = 'Signup details';

  public usuario: Usuario = new Usuario();

  constructor(private signupService: SignupService,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estas autenticado!`, 'info');
      this.router.navigate(['/dashboard']);
    }
  }

  signUp(): void {
    this.signupService.createUsuario(this.usuario).subscribe(
      json => {
        this.router.navigate(['/login']);
        Swal.fire('Nuevo usuario ', `${json.usuario.username} agregado con exito!`, 'success');
        this.createNotification(this.usuario);
      }
    );
  }

  createNotification(usuario: Usuario): void{
    const notification: BugNotification = new BugNotification();

    notification.description = `${usuario.nombre} ${usuario.apellido} created an user on ${new Date().toDateString()} with ${usuario.username} as username.`;

    this.notificationService.newNotification(notification).subscribe();
  }

}
