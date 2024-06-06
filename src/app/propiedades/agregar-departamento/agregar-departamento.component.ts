import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-agregar-departamento',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './agregar-departamento.component.html',
  styleUrl: './agregar-departamento.component.css'
})
export class AgregarDepartamentoComponent {
  propertyForm: FormGroup;
  images: string[] = [];
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      descripcion: ['', Validators.required],
      areaTerreno: ['', Validators.required],
      banos: ['', Validators.required],
      dormitorios: ['', Validators.required],
      cochera: [false, Validators.required],
      cantCocheras: [''],
      otrasComodidades: [''],
      tipoPropiedad: ['casa', Validators.required],
      cantPisos: [''],
      jardin: [false],
      areaJardin: [''],
      atico: [false],
      sotano: [false],
      piso: [''],
      int: [''],
      ascensor: [false],
      areasComunes: [false],
      areasComunesEspecificas: [''],
      pais: ['', Validators.required],
      region: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      tipo: ['', Validators.required],
      nombre: ['', Validators.required],
      manzana: [''],
      lote: [''],
      interior: [''],
      referencia: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      costoTotal: ['', Validators.required],
      costoInicial: ['', Validators.required],
      images: [this.images, Validators.required]
    });
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.images.length < 5) {
          this.images.push(e.target.result);
          this.propertyForm.controls['images'].setValue(this.images);
        } else {
          alert('No puedes subir más de 5 imágenes');
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.propertyForm.controls['images'].setValue(this.images);
  }

}
