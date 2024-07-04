import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {Propiedad} from "../../interfaces/propiedad";
import {PropiedadService} from "../../services/propiedad.service";
import {NgForOf, NgIf} from "@angular/common";
import {FotoService} from "../../services/foto.service";

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})

export class PropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(private propiedadService: PropiedadService, private fotoService: FotoService) {}

  ngOnInit() {
    this.propiedadService.listarPropiedades().subscribe(
      (data: Propiedad[]) => {
        this.propiedades = data;
        // Log para ver la información de las propiedades
        console.log('Propiedades cargadas:', this.propiedades);

        // Cargar las imágenes para cada propiedad
        this.propiedades.forEach(propiedad => {
          propiedad.fotos.forEach(foto => {
            foto.nombreFoto = this.cleanFilename(foto.nombreFoto);
          });
          if (propiedad.fotos.length > 0) {
            this.loadImage(propiedad.idPropiedad, propiedad.fotos[0].nombreFoto);
          }
        });
      },
      (error) => {
        console.error('Error al cargar las propiedades', error);
      }
    );
  }

  loadImage(propiedadId: number, filename: string) {
    this.fotoService.getFoto(filename).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls[propiedadId] = e.target.result;
        };
        reader.readAsDataURL(blob);
      },
      (error) => {
        console.error('Error al cargar la imagen', error);
        this.imageUrls[propiedadId] = 'assets/img/CASA.png';
      }
    );
  }

  getFirstImageUrl(propiedad: Propiedad): string {
    return this.imageUrls[propiedad.idPropiedad] || 'assets/img/CASA.png';
  }

  cleanFilename(filename: string): string {
    try {
      const url = new URL(filename);
      return url.pathname.split('/').pop() || filename;
    } catch (e) {
      // Si no es una URL válida, retorna el filename original
      return filename;
    }
  }
  getRouterLink(propiedad: Propiedad): string {
    const tipoPropiedad = propiedad.tipoPropiedad.toLowerCase();
    if (tipoPropiedad === 'casa' || tipoPropiedad === 'Casa' ) {
      return `/verPropiedadC/${propiedad.idPropiedad}`;
    } else if (tipoPropiedad === 'departamento' || tipoPropiedad === 'Departamento') {
      return `/verPropiedadD/${propiedad.idPropiedad}`;
    } else {
      return `/verPropiedad/${propiedad.idPropiedad}`; // Default route
    }
  }
}
