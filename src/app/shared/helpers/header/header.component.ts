import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public authService:AuthService, private router: Router) { }

  logout():void{
    Swal.fire('Logout',`Hola ${this.authService.usuario.username}, has cerrado sesion con exito!`,'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
