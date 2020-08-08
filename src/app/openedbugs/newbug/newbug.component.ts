import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/shared/models/bug';
import { BugService } from 'src/app/shared/services/bug.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BugNotification } from 'src/app/shared/models/bugnotification';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-newbug',
  templateUrl: './newbug.component.html',
  styleUrls: ['./newbug.component.css']
})
export class NewbugComponent implements OnInit {

  public bug: Bug = new Bug();
  public usuarioOriginal = this.authService.usuario;
  // fotoSeleccionada: File;
  progreso = 0;

  constructor(private router: Router,
              public bugService: BugService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

  }

  newBug(): void {
    this.spinner.show();

    if (this.bug.usuario == null) {
      this.bug.usuario = this.authService.usuarioId;
    }

    // if (this.fotoSeleccionada == null) {
    //   Swal.fire('Photo', `You must upload a photo`, 'warning');
    // } else {
    this.bugService.createBug(this.bug).subscribe(
      json => {
        this.createNotification(this.bug);
        this.spinner.hide();
        Swal.fire({
          title: 'Bug Created',
          text: 'Your new bug was created',
          icon: 'success',
          confirmButtonText: 'Ok!',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate([`/detallebug/${json.id}`]);
          }
        });

        // this.subirFoto(json.id);
      }, err => {
        if (err.status != null) {
          Swal.fire('Sign Up', 'Verificar datos Email y/o Usuario!', 'error');
          this.spinner.hide();
        }
      }
    );
    // }
  }

  // seleccionarFoto(event) {
  //   this.fotoSeleccionada = event.target.files[0];

  //   if (this.fotoSeleccionada.type.indexOf('image') < 0) {
  //     Swal.fire('Error seleccionar imagen :', 'El archivo debe ser una imagen', 'error');
  //     this.fotoSeleccionada = null;
  //   }
  // }

  // subirFoto(id: number) {
  //   if (!this.fotoSeleccionada) {
  //     Swal.fire('Error Upload:', 'Debe seleccionar una foto', 'error');
  //   } else {
  //     this.bugService.subirFoto(this.fotoSeleccionada, id)
  //       .subscribe(event => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progreso = Math.round((event.loaded / event.total) * 100);
  //         } else if (event.type === HttpEventType.Response) {
  //           Swal.fire({
  //             title: 'Bug Created',
  //             text: 'Your new bug was created',
  //             icon: 'success',
  //             confirmButtonText: 'Ok!',
  //             reverseButtons: true
  //           }).then((result) => {
  //             if (result.value) {
  //               this.router.navigate([`/detallebug/${id}`]);
  //             }
  //           });
  //         }
  //       });
  //   }
  // }

  createNotification(bug: Bug): void {
    const notification: BugNotification = new BugNotification();

    notification.description = `The user ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} opened the bug: ${bug.title}. On ${new Date().toDateString()}`;

    this.notificationService.newNotification(notification).subscribe();
  }

}
