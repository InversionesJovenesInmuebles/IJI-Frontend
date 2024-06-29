import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import {LowerCasePipe, NgClass, NgForOf} from "@angular/common";
import {Agente} from "../../interfaces/agente";
import {InmobiliariaService} from "../../services/inmobiliaria.service";

@Component({
  selector: 'app-gestionar-agente',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    LowerCasePipe,
    NgForOf
  ],
  templateUrl: './gestionar-agente.component.html',
  styleUrls: ['./gestionar-agente.component.css']
})
export class GestionarAgenteComponent implements OnInit {
  isModalOpen = false;
  agentes: Agente[] = [];
  agenteAEliminar: Agente | null = null;

  constructor(private router: Router, private inmobiliariaService: InmobiliariaService) {}

  ngOnInit(): void {
    this.listarAgentes();
  }

  listarAgentes(): void {
    this.inmobiliariaService.listarAgentesInmobiliaria('REMAX').subscribe(
      (agentes) => {
        this.agentes = agentes;
        console.error(agentes)
      },
      (error) => {
        console.error('Error al listar agentes:', error);
      }
    );
  }

  openModal(agente: Agente): void {
    this.isModalOpen = true;
    this.agenteAEliminar = agente;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.agenteAEliminar = null;
  }

  eliminarSi(): void {
    if (this.agenteAEliminar) {
      this.inmobiliariaService.eliminarAgente(this.agenteAEliminar.id).subscribe(
        () => {
          console.log('Agente inmobiliario eliminado');
          this.listarAgentes(); // Actualiza la lista de agentes
          this.closeModal();
        },
        (error) => {
          console.error('Error al eliminar agente:', error);
        }
      );
    }
  }

  eliminarNo(): void {
    this.closeModal();
  }

  modificarAgente(id: number): void {
    this.router.navigate(['/modificarAgente', id]);
  }
}
