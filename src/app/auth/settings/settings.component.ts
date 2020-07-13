import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']

})
export class SettingsComponent implements OnInit {

  pagina: number = 1;

  constructor() { }

  ngOnInit(): void {
  }
}
