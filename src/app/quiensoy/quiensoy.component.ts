import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html'
})
export class QuienSoyComponent {

  cumpleanios: string = "08/18/1993";
  telefono: string = "+52 833 171 49 09";
  ciudad: string = "Tampico, Tamaulipas";
  estudios: string = "Licenciatura";
  email: string = "Luque23@live.com.mx";
  freelancer: string = "Disponible";

  constructor() { }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

}
