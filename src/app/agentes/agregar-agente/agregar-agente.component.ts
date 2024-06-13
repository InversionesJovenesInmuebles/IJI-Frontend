import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {RegisterAgenteRequest} from "../../interfaces/register-agente-request";
import {InmobiliariaService} from "../../services/inmobiliaria.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-gestionar-agente',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './agregar-agente.component.html',
  styleUrls: ['./agregar-agente.component.css']
})

export class AgregarAgenteComponent {
  agent: RegisterAgenteRequest = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    nombreInmobiliaria: '',
    telefono: '',
    dni: ''
  };

  constructor(
    private inmobiliariaService: InmobiliariaService,
    private router: Router
  ) {}

  onSubmit() {
    const token = localStorage.getItem('token');
    this.inmobiliariaService.registrarAgente(this.agent, token).subscribe(
      response => {
        console.log('Agente registrado exitosamente', response);
        this.router.navigate(['/gestionarAgente']);
      },
      error => {
        console.error('Error al registrar agente', error);
      }
    );
  }
}

