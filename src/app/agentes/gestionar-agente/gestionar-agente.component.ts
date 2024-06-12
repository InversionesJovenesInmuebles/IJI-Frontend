import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-gestionar-agente',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './gestionar-agente.component.html',
  styleUrls: ['./gestionar-agente.component.css']
})
export class GestionarAgenteComponent {
  isModalOpen = false;

  constructor(private router: Router) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  eliminarSi() {
    // Lógica para eliminar el agente inmobiliario
    console.log('Agente inmobiliario eliminado');
    this.closeModal();
  }

  eliminarNo() {
    this.closeModal();
  }
}
