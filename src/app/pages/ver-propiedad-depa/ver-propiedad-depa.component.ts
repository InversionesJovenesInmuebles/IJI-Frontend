import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Departamento} from "../../interfaces/departamento-propiedad";
import {ActivatedRoute} from "@angular/router";
import {PropiedadService} from "../../services/propiedad.service";
import {FotoService} from "../../services/foto.service";
import {Propiedad} from "../../interfaces/propiedad";
import {Foto} from "../../interfaces/foto";

@Component({
  selector: 'app-ver-propiedad-depa',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    NgForOf
  ],
  templateUrl: './ver-propiedad-depa.component.html',
  styleUrl: './ver-propiedad-depa.component.css'
})
export class VerPropiedadDepaComponent implements OnInit {
  propiedad: Departamento | null = null;
  fotos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private fotoService: FotoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerPropiedad(id);
    });
  }

  obtenerPropiedad(id: number): void {
    this.propiedadService.obtenerPropiedadPorId(id).subscribe((propiedad: Propiedad) => {
      this.propiedad = propiedad as Departamento;  // Type assertion here
      this.cargarFotos(this.propiedad.fotos);
    });
  }

  cargarFotos(fotos: Foto[]): void {
    fotos.forEach(foto => {
      const nombreArchivo = this.extraerNombreArchivo(foto.nombreFoto);
      this.fotoService.getFoto(nombreArchivo).subscribe((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.fotos.push(url);
      });
    });
  }

  extraerNombreArchivo(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 1];
  }
}

