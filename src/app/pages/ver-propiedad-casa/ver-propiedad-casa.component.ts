import {Component, OnInit} from '@angular/core';
import {Casa} from "../../interfaces/casa-propiedad";
import {ActivatedRoute} from "@angular/router";
import {PropiedadService} from "../../services/propiedad.service";
import {FotoService} from "../../services/foto.service";
import {Foto} from "../../interfaces/foto";
import {NgForOf, NgIf} from "@angular/common";
import {Propiedad} from "../../interfaces/propiedad";

@Component({
  selector: 'app-ver-propiedad-casa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './ver-propiedad-casa.component.html',
  styleUrl: './ver-propiedad-casa.component.css'
})
export class VerPropiedadCasaComponent implements OnInit {
  propiedad: Casa | null = null;
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
      this.propiedad = propiedad as Casa;  // Type assertion here
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


