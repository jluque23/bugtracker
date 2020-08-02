import { Component, OnInit } from '@angular/core';
import { BugService } from '../shared/services/bug.service';
import { ActivatedRoute } from '@angular/router';
import { Bug } from '../shared/models/bug';

@Component({
  selector: 'app-closedbugs',
  templateUrl: './closedbugs.component.html',
  styleUrls: ['./closedbugs.component.css']
})
export class ClosedbugsComponent implements OnInit {
  bugs: Bug[];
  paginador: any;
  bugSeleccionado: Bug;
  bugsCancelados: Bug[] = [];

  constructor(private bugService: BugService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.bugService.getBugs(page).subscribe(response => {
        this.bugs = response.content as Bug[];

        this.bugs.forEach(bug => {
          if (bug.enabled === false) {
            this.bugsCancelados.push(bug);
          }
        });

        this.paginador = response;

      });
    });
  }
}

