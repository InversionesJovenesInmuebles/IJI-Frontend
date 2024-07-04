import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AgenteService} from "../../services/agente.service";

@Component({
  selector: 'app-agregar-departamento',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './agregar-departamento.component.html',
  styleUrl: './agregar-departamento.component.css'
})
export class AgregarDepartamentoComponent {
  propertyForm: FormGroup;
  fotos: File[] = []; // Cambia el tipo a File[]

  constructor(private fb: FormBuilder,private router: Router, private agenteService: AgenteService) {
    this.propertyForm = this.fb.group({
      descripcion: ['', Validators.required],
      areaTerreno: ['', Validators.required],
      cantBanos: ['', Validators.required],
      cantDormitorios: ['', Validators.required],
      cochera: [false],
      cantCochera: [''],
      otrasComodidades: [''],
      tipoPropiedad: ['departamento', Validators.required],
      pisos: [''],
      interior: [''],
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
      int: [''],
      referencia: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      costoTotal: ['', Validators.required],
      costoInicial: ['', Validators.required],
      fotos: ['']
    });
  }
  onFileSelected(event: any) {
    const files = event.target.files;
    if (this.fotos.length + files.length > 5) {
      alert('No puedes subir más de 5 imágenes en total');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.fotos.push(files[i]); // Almacena el archivo original
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Previsualiza la imagen sin convertirla a base64
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number) {
    this.fotos.splice(index, 1);
    this.propertyForm.controls['fotos'].setValue(this.fotos);
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
      direccion += ` Int. ${interior}.`;
    }
    direccion += ` ${referencia}.`;

    return direccion;
  }

  onSubmit() {
    const formData = new FormData();
    const formValues = this.propertyForm.value;

    // Llama a createDireccion y agrega el resultado a formData
    const direccion = this.createDireccion();
    formData.append('direccion', direccion);

    for (let key in formValues) {
      if (key !== 'fotos') {
        formData.append(key, formValues[key]);
      }
    }

    // Agrega las imágenes como archivos
    for (let i = 0; i < this.fotos.length; i++) {
      formData.append('fotos', this.fotos[i], this.fotos[i].name);
    }

    this.agenteService.agregarDepartamento(formData).subscribe(
      response => {
        console.log('Departamento agregada exitosamente', response);
        this.router.navigateByUrl('/gestionarPropiedades'); // Redireccionar al usuario
      },
      error => {
        console.error('Error al agregar casa', error);
        this.router.navigateByUrl('/gestionarPropiedades'); // Redireccionar al usuario en caso de error también
      }
    );

  }
}
