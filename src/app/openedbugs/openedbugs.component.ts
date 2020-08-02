import { Component, OnInit } from '@angular/core';
import { Bug } from '../shared/models/bug';
import { BugService } from '../shared/services/bug.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-openedbugs',
  templateUrl: './openedbugs.component.html',
  styleUrls: ['./openedbugs.component.css']
})
export class OpenedbugsComponent implements OnInit {
  bugs: Bug[];
  paginador: any;
  bugSeleccionado: Bug;
  bugsActivos: Bug[] = [];

  constructor(private bugService: BugService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.bugService.getBugs(page).subscribe(response => {
        this.bugs = response.content as Bug[];

        this.bugs.forEach(bug => {
          if (bug.enabled === true) {
            this.bugsActivos.push(bug);
          }
        });

        this.paginador = response;

      });
    });
  }


}
