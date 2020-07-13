import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/shared/models/publicacion';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/shared/services/publicacion.service';

@Component({
  selector: 'app-publicacionesdetalle',
  templateUrl: './publicacionesdetalle.component.html'
})
export class PublicacionesdetalleComponent implements OnInit {

  public publicacion: Publicacion = new Publicacion();
  
  constructor(private activatedRoute: ActivatedRoute, private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.cargarPublicacion();
  }

  cargarPublicacion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['publicacionId'];

      if (id) {
        this.publicacionService.getPublicacion(id).subscribe((publicacion) => this.publicacion = publicacion)
      }
    })
  }

}
