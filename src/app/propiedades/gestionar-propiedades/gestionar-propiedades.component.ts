import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-gestionar-propiedades',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './gestionar-propiedades.component.html',
  styleUrl: './gestionar-propiedades.component.css'
})
export class GestionarPropiedadesComponent {
  isModalOpen = false;

  constructor(private router: Router) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addHouse() {
    this.closeModal();
    // Redirigir a la ruta de agregar casa
    this.router.navigate(['/agregarCasa']);
  }

  addApartment() {
    this.closeModal();
    // Redirigir a la ruta de agregar departamento
    this.router.navigate(['/agregarDepartamento']);
  }
}
