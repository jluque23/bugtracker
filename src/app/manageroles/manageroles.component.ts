import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { Usuario } from '../shared/models/usuario';
import { SignupService } from '../shared/services/signup.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(private modalService: ModalService, private signupService: SignupService, private activatedRoute: ActivatedRoute) { }

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

    this.modalService.notificarUpload.subscribe(usuario => {
      this.usuarios = this.usuarios.map(usuarioOriginal => {
        return usuarioOriginal;
      });
    });

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
}
