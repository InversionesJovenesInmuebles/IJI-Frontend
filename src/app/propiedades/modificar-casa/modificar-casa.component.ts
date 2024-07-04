import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AgenteService} from "../../services/agente.service";
import {PropiedadService} from "../../services/propiedad.service";
import {CasaModificar} from "../../interfaces/casa-modificar";

@Component({
  selector: 'app-modificar-casa',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './modificar-casa.component.html',
  styleUrl: './modificar-casa.component.css'
})
export class ModificarCasaComponent implements OnInit {
  PropiedadId: number = 0;
  propertyForm: FormGroup;
  fotos: File[] = [];

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    protected router: Router,
    private agenteService: AgenteService
  ) {
    this.propertyForm = this.fb.group({
      descripcion: ['', Validators.required],
      areaTerreno: ['', Validators.required],
      cantBanos: ['', Validators.required],
      cantDormitorios: ['', Validators.required],
      cochera: [false],
      cantCochera: [''],
      otrasComodidades: [''],
      tipoPropiedad: ['Casa', Validators.required],
      cantPisos: ['', Validators.required],
      jardin: [false],
      areaJardin: [''],
      atico: [false],
      sotano: [false],
      pais: ['', Validators.required],
      region: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      direccion: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      costoTotal: ['', Validators.required],
      costoInicial: ['', Validators.required],
      fotos: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.PropiedadId = +params['id']; // Obtener el ID de la propiedad desde la URL
      this.obtenerDatosCasa(this.PropiedadId);
    });
  }

  obtenerDatosCasa(id: number): void {
    this.propiedadService.obtenerCasaPorId(id).subscribe((casa: CasaModificar) => {
      this.propertyForm.patchValue(casa);
      // No asignamos las fotos aquí porque queremos que sean seleccionadas por el usuario.
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (this.fotos.length + files.length > 5) {
      alert('No puedes subir más de 5 imágenes en total');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.fotos.push(files[i]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Maneja la vista previa de las imágenes aquí si es necesario
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number) {
    this.fotos.splice(index, 1);
  }

  onSubmit() {
    if (this.propertyForm.invalid) {
      return;
    }

    const casaData: CasaModificar = this.propertyForm.value;

    const formData = new FormData();
    formData.append('descripcion', casaData.descripcion);
    formData.append('areaTerreno', casaData.areaTerreno.toString());
    formData.append('cantBanos', casaData.cantBanos.toString());
    formData.append('cantDormitorios', casaData.cantDormitorios.toString());
    formData.append('cochera', casaData.cochera.toString());
    formData.append('cantCochera', casaData.cantCochera ? casaData.cantCochera.toString() : '');
    formData.append('otrasComodidades', casaData.otrasComodidades);
    formData.append('tipoPropiedad', casaData.tipoPropiedad);
    formData.append('cantPisos', casaData.cantPisos.toString());
    formData.append('jardin', casaData.jardin.toString());
    formData.append('areaJardin', casaData.areaJardin ? casaData.areaJardin.toString() : '');
    formData.append('atico', casaData.atico.toString());
    formData.append('sotano', casaData.sotano.toString());
    formData.append('pais', casaData.pais);
    formData.append('region', casaData.region);
    formData.append('provincia', casaData.provincia);
    formData.append('distrito', casaData.distrito);
    formData.append('direccion', casaData.direccion);
    formData.append('latitud', casaData.latitud ? casaData.latitud.toString() : '');
    formData.append('longitud', casaData.longitud ? casaData.longitud.toString() : '');
    formData.append('costoTotal', casaData.costoTotal.toString());
    formData.append('costoInicial', casaData.costoInicial.toString());

    this.fotos.forEach((file, index) => {
      formData.append('fotos', file, file.name);
    });

    const token = localStorage.getItem('token') || '';

    this.agenteService.modificarCasa(this.PropiedadId, formData, token).subscribe(
      response => {
        alert('Casa modificada exitosamente');
        this.router.navigate(['/gestionarPropiedades']);
      },
      error => {
        console.error('Error al modificar la casa', error);
        this.router.navigate(['/gestionarPropiedades']);
      }
    );
  }
}
