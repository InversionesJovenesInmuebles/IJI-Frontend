import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";
import {Propiedad} from "../../interfaces/propiedad";
import {PropiedadService} from "../../services/propiedad.service";
import {AgenteService} from "../../services/agente.service";

@Component({
  selector: 'app-gestionar-propiedades',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgForOf
  ],
  templateUrl: './gestionar-propiedades.component.html',
  styleUrl: './gestionar-propiedades.component.css'
})
export class GestionarPropiedadesComponent implements OnInit {
  isModalOpen = false;
  isDeleteModalOpen = false;
  propiedades: Propiedad[] = [];
  propiedadSeleccionada: Propiedad | null = null;

  constructor(
    private router: Router,
    private propiedadService: PropiedadService,
    private agenteService: AgenteService,
    private cdr: ChangeDetectorRef // Inyección del ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    this.propiedadService.listarPropiedadesAgente().subscribe((propiedades) => {
      this.propiedades = propiedades;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeleteModal(propiedad: Propiedad) {
    this.propiedadSeleccionada = propiedad;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.propiedadSeleccionada = null;
  }

  confirmDelete() {
    if (this.propiedadSeleccionada) {
      const propiedadId = this.propiedadSeleccionada.idPropiedad;
      const propiedadTipo = this.propiedadSeleccionada.tipoPropiedad.toLowerCase();

      console.log(`Eliminando propiedad: ${propiedadId} - Tipo: ${propiedadTipo}`);

      if (propiedadTipo === 'casa') {
        this.agenteService.eliminarCasa(propiedadId).subscribe(() => {
          console.log(`Casa eliminada: ${propiedadId}`);
          this.actualizarPropiedades(propiedadId);
        });
      } else if (propiedadTipo === 'departamento') {
        this.agenteService.eliminarDepartamento(propiedadId).subscribe(() => {
          console.log(`Departamento eliminado: ${propiedadId}`);
          this.actualizarPropiedades(propiedadId);
        });
      }
      this.closeDeleteModal();
    }
  }

  actualizarPropiedades(propiedadId: number) {
    this.propiedades = this.propiedades.filter(p => p.idPropiedad !== propiedadId);
    console.log('Propiedades actualizadas:', this.propiedades);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  addHouse() {
    this.closeModal();
    this.router.navigate(['/agregarCasa']);
  }

  addApartment() {
    this.closeModal();
    this.router.navigate(['/agregarDepartamento']);
  }
}

