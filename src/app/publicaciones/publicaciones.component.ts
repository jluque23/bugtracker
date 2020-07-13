import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../shared/models/publicacion';
import { PublicacionService } from '../shared/services/publicacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html'
})
export class PublicacionesComponent implements OnInit {
  titulo = "Publicaciones";

  publicaciones: Publicacion[];
  paginador: any;
  
  constructor(private publicacionService: PublicacionService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let page: number = + params.get('page');

      if(!page){
        page = 0;
      }

      this.publicacionService.getPublicaciones(page).subscribe(response =>{
        this.publicaciones = response.content as Publicacion[];
        this.paginador = response;        
      });
    });

  }

}
