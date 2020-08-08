import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Usuario } from 'src/app/shared/models/usuario';
import Swal from 'sweetalert2';
import { SignupService } from 'src/app/shared/services/signup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BugNotification } from 'src/app/shared/models/bugnotification';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.css']
})
export class UsermodalComponent implements OnInit {
  @Input() usuario: Usuario;

  titulo = 'Manager Role Assignment';

  constructor(public modalService: ModalService,
              private usuarioService: SignupService,
              private notificationService: NotificationService,
              private authService: AuthService) { }

  ngOnInit(): void {

  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  makeAdmin(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make this user a Developer!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.makeUserAdmin(this.usuario).subscribe(
          json => {
            Swal.fire('Admin User', `${json.usuario.username} ${json.mensaje}!`, 'success')
            .then((result) => {
              if (result.value){
                window.location.reload(false);
              }
            });
            this.createNotification(this.authService.usuario);

          }
        );
      }
    });
  }

  createNotification(usuario: Usuario): void{
    const notification: BugNotification = new BugNotification();

    notification.description = `${usuario.nombre} ${usuario.apellido} updated ${this.usuario.nombre} ${this.usuario.apellido} to Admin User on ${new Date().toDateString()}.`;

    this.notificationService.newNotification(notification).subscribe();
  }

}
