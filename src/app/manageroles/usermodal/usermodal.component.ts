import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.css']
})
export class UsermodalComponent implements OnInit {
  @Input() usuario: Usuario;

  titulo: 'Manager Role Assignment';

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {

  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }
}
