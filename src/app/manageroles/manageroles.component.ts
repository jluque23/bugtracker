import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { Usuario } from '../shared/models/usuario';
import { SignupService } from '../shared/services/signup.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';
import { URL_BACKEND } from '../shared/config/config';

@Component({
  selector: 'app-manageroles',
  templateUrl: './manageroles.component.html',
  styleUrls: ['./manageroles.component.css']
})
export class ManagerolesComponent implements OnInit {

  usuarios: Usuario[];
  paginador: any;
  usuarioSeleccionado: Usuario;
  usuariosTotal = 0;
  usuariosAdmin = 0;
  usuariosGeneral = 0;
  searchText;
  urlBackend = URL_BACKEND;

  constructor(private modalService: ModalService,
              private signupService: SignupService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.signupService.getUsuarios(page).subscribe(response => {
        this.usuarios = response.content as Usuario[];

        this.paginador = response;
        this.usuariosTotal = this.usuarios.length;

        this.numeroUsuariosAdmin(this.usuarios);
        this.numeroUsuariosGeneral();
      });
    });

    // this.modalService.notificarUpload.subscribe(
    //   this.usuarios = this.usuarios.map(usuarioOriginal => {
    //     return usuarioOriginal;
    //   })
    // );

  }

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }

  numeroUsuariosAdmin(usuarios: Usuario[]){
    usuarios.forEach(element => {
      if (element.roles.some( usuario => usuario['nombre'] === 'ROLE_ADMIN')){
        this.usuariosAdmin++;
      }
    });
    return this.usuariosAdmin;
  }

  numeroUsuariosGeneral(){
    this.usuariosGeneral = this.usuariosTotal - this.usuariosAdmin;
  }

  makeAdmin(usuario: Usuario){
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
        this.abrirModal(usuario);
      }
    });
  }

  changeRole(roles: string[]){
    if (roles.some( usuario => usuario['nombre'] === 'ROLE_ADMIN')){
      return 'DEVELOPER';
    }
    if (roles.some( usuario => usuario['nombre'] === 'ROLE_USER')){
      return 'GENERAL USER';
    }
  }

  verifyRoles(roles: string[]){
    if (roles.some( usuario => usuario['nombre'] === 'ROLE_ADMIN')){
      return true;
    }
  }
}
