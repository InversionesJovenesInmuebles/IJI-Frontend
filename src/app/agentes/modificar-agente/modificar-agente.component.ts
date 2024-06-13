import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {InmobiliariaService} from "../../services/inmobiliaria.service";
import {Agente} from "../../interfaces/agente";

@Component({
  selector: 'app-modificar-agente',
  templateUrl: './modificar-agente.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./modificar-agente.component.css']
})
export  class ModificarAgenteComponent implements OnInit {
  idAgente: number = 0;
  agenteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inmobiliariaService: InmobiliariaService
  ) {
    this.agenteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      inmobiliaria: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idAgente = +this.route.snapshot.paramMap.get('id')!;
    this.cargarAgente(this.idAgente);
  }

  cargarAgente(id: number): void {
    this.inmobiliariaService.getAgenteById(id).subscribe(
      (agente: Agente) => {
        this.agenteForm.patchValue({
          nombre: agente.nombre,
          apellidos: agente.apellido,
          dni: agente.dni,
          telefono: agente.telefono,
          inmobiliaria: agente.nombreInmobiliaria,
          correo: agente.username,
          contrasena: '' // La contraseña no se obtiene por razones de seguridad
        });
      },
      (error) => {
        console.error('Error al cargar el agente:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.agenteForm.valid) {
      const request = {
        nombre: this.agenteForm.value.nombre,
        apellido: this.agenteForm.value.apellidos,
        dni: this.agenteForm.value.dni,
        telefono: this.agenteForm.value.telefono,
        nombreInmobiliaria: this.agenteForm.value.inmobiliaria,
        correo: this.agenteForm.value.correo,
        contrasena: this.agenteForm.value.contrasena
      };

      this.inmobiliariaService.modificarAgente(this.idAgente, request).subscribe(
        (agenteModificado) => {
          console.log('Agente modificado:', agenteModificado);
          this.router.navigate(['/gestionarAgente']);
        },
        (error) => {
          console.error('Error al modificar el agente:', error);
        }
      );
    }
  }
}

