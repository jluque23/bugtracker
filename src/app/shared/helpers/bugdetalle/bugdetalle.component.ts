import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/shared/models/bug';
import { ActivatedRoute, Router } from '@angular/router';
import { BugService } from 'src/app/shared/services/bug.service';
import { Bugcomentario } from 'src/app/shared/models/bugcomentario';
import { BugcomentarioService } from 'src/app/shared/services/bugcomentario.service';
import Swal from 'sweetalert2';
import { BugNotification } from 'src/app/shared/models/bugnotification';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { URL_BACKEND } from '../../config/config';

@Component({
  selector: 'app-bugdetalle',
  templateUrl: './bugdetalle.component.html',
  styleUrls: ['./bugdetalle.component.css']
})
export class BugdetalleComponent implements OnInit {

  public bug: Bug = new Bug();
  public comentarios: Bugcomentario[] = [];
  public bugComentario: Bugcomentario = new Bugcomentario();
  urlBackend = URL_BACKEND;

  constructor(private activatedRoute: ActivatedRoute,
              private bugService: BugService,
              private bugComentarioService: BugcomentarioService,
              private router: Router,
              private notificationService: NotificationService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.cargarBug();
  }

  cargarBug(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['bugId'];

      if (id) {
        this.bugService.getBug(id).subscribe((bug) => this.bug = bug);

        this.bugComentarioService.getBugComentarios(id).subscribe(response => {
          this.comentarios = response as Bugcomentario[];
        });
      }
    });
  }

  cerrarBug(): void {
    Swal.fire({
      title: 'Do you want to close the bug?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor:  '#3085d6',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.value) {
        this.bug.enabled = false;
        this.bugService.updateBug(this.bug).subscribe(
          json => {
            this.router.navigate(['/openedbugs']);
            Swal.fire(
              'Closed!',
              'Your bug has been closed.',
              'success'
            );
            this.createBugNotification(this.bug);
          }
        );
      }
    });
  }

  newBugComentario(): void {
    this.bugComentario.usuario = `${this.authService.usuario.nombre} ${this.authService.usuario.apellido}`;
    this.bugComentario.bug = this.bug;

    this.bugComentarioService.newComentarioBug(this.bugComentario).subscribe(
      json => {
        Swal.fire({
          title: 'Creado con exito!',
          text: 'El comentario se ha creado con exito!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.value) {
            window.location.reload(false);
            this.createBugComentarioNotification(this.bug);
          }
        });
      }
    );
  }


  createBugNotification(bug: Bug): void{
    const notification: BugNotification = new BugNotification();

    notification.description = `The user ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} closed the bug: #${bug.id} ${bug.title}. On ${new Date().toDateString()}`;

    this.notificationService.newNotification(notification).subscribe();
  }

  createBugComentarioNotification(bug: Bug): void{
    const notification: BugNotification = new BugNotification();

    notification.description = `The user ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} commented on the bug: #${bug.id} ${bug.title}. On ${new Date().toDateString()}`;

    this.notificationService.newNotification(notification).subscribe();
  }
}
