import { Component, OnInit } from '@angular/core';
import { BugService } from '../shared/services/bug.service';
import { Bug } from '../shared/models/bug';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bugs: Bug[];
  totalBugs = 0;
  solvedBugs = 0;
  activeBugs = 0;
  searchText;
  page = 1;
  pageSize = 4;
  collectionSize = this.totalBugs;

  constructor(private bugService: BugService) { }

  ngOnInit(): void {
    this.bugService.totalBugs().subscribe(response => {
      this.bugs = response as Bug[];
      this.totalBugs = this.bugs.length;

      this.numeroBugsSolved(this.bugs);
    });
  }

  numeroBugsSolved(bugs: Bug[]) {
    bugs.forEach(bug => {
      if (bug.enabled === false) {
        this.solvedBugs++;
      } else {
        this.activeBugs++;
      }
    });
    return this.solvedBugs;
  }

  solvedOrNot(bool) {
    if (bool === true) {
      return 'Not Solved';
    } else {
      return 'Solved';
    }
  }
}
