import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/shared/models/bug';
import { BugService } from 'src/app/shared/services/bug.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { BugNotification } from 'src/app/shared/models/bugnotification';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-newbug',
  templateUrl: './newbug.component.html',
  styleUrls: ['./newbug.component.css']
})
export class NewbugComponent implements OnInit {

  public bug: Bug = new Bug();
  public usuarioOriginal = this.authService.usuario;

  constructor(private router: Router,
              public bugService: BugService,
              private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  newBug(): void {
    if (this.bug.usuario == null){
      this.bug.usuario = this.authService.usuarioId;
    }

    this.bugService.createBug(this.bug).subscribe(
      json => {
        this.router.navigate(['/openedbugs']);
        Swal.fire('New bug ', `Title: ${json.title}. created succesfully!`, 'success');
        this.createNotification(this.bug);
      }
    );
  }

  createNotification(bug: Bug): void{
    const notification: BugNotification = new BugNotification();

    notification.description = `The user ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} opened the bug: ${bug.title}. On ${new Date().toDateString()}`;

    this.notificationService.newNotification(notification).subscribe();
  }

}
