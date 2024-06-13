import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-agregar-casa',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './agregar-casa.component.html',
  styleUrls: ['./agregar-casa.component.css']
})
export class AgregarCasaComponent {
  propertyForm: FormGroup;
  images: string[] = [];
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      descripcion: ['', Validators.required],
      areaTerreno: ['', Validators.required],
      banos: ['', Validators.required],
      dormitorios: ['', Validators.required],
      cochera: [false],
      cantCocheras: [''],
      otrasComodidades: [''],
      tipoPropiedad: ['casa', Validators.required],
      cantPisos: ['', Validators.required],
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
      manzana: ['', Validators.required],
      lote: ['', Validators.required],
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

  createDireccion() {
    const tipo = this.propertyForm.get('tipo')?.value;
    const nombre = this.propertyForm.get('nombre')?.value;
    const manzana = this.propertyForm.get('manzana')?.value;
    const lote = this.propertyForm.get('lote')?.value;
    const interior = this.propertyForm.get('interior')?.value;
    const referencia = this.propertyForm.get('referencia')?.value;

    let direccion = `${tipo} ${nombre} Mz. ${manzana} Lote ${lote}`;
    if (interior) {
      direccion += ` Int. ${interior}. ${referencia}.`;
    }
    direccion += `. ${referencia}.`;

    return direccion;
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const direccion = this.createDireccion();
      console.log('Dirección:', direccion);
      // Aquí podrías realizar la lógica para enviar el formulario junto con la dirección generada
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }
}
