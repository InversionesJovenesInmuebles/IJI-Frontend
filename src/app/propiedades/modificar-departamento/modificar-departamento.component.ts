import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PropiedadService} from "../../services/propiedad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AgenteService} from "../../services/agente.service";
import {DepartamentoModificar} from "../../interfaces/departamento-modificar";

@Component({
  selector: 'app-modificar-departamento',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './modificar-departamento.component.html',
  styleUrl: './modificar-departamento.component.css'
})
export class ModificarDepartamentoComponent implements OnInit{
  PropiedadId: number = 0;
  propertyForm: FormGroup;
  fotos: File[] = []; // Cambia el tipo a File[]

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
      tipoPropiedad: ['Departamento', Validators.required],
      pisos: [''],
      interior: [''],
      ascensor: [false],
      areasComunes: [false],
      areasComunesEspecificas: [''],
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
      this.obtenerDatosDepa(this.PropiedadId);
    });
  }

  obtenerDatosDepa(id: number): void {
    this.propiedadService.obtenerDepartamentoPorId(id).subscribe((departamento: DepartamentoModificar) => {
      this.propertyForm.patchValue(departamento);
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
    this.propertyForm.controls['fotos'].setValue(this.fotos);
  }

  onSubmit() {
    if (this.propertyForm.invalid) {
      return;
    }

    const depaData: DepartamentoModificar = this.propertyForm.value;

    const formData = new FormData();
    formData.append('descripcion', depaData.descripcion);
    formData.append('areaTerreno', depaData.areaTerreno.toString());
    formData.append('cantBanos', depaData.cantBanos.toString());
    formData.append('cantDormitorios', depaData.cantDormitorios.toString());
    formData.append('cochera', depaData.cochera.toString());
    formData.append('cantCochera', depaData.cantCochera ? depaData.cantCochera.toString() : '');
    formData.append('otrasComodidades', depaData.otrasComodidades);
    formData.append('tipoPropiedad', depaData.tipoPropiedad);
    formData.append('pisos', depaData.pisos.toString());
    formData.append('interior', depaData.interior ? depaData.interior.toString() : '');
    formData.append('ascensor', depaData.ascensor.toString());
    formData.append('areasComunes', depaData.areasComunes.toString());
    formData.append('areasComunesEspecificas', depaData.areasComunesEspecificas);
    formData.append('pais', depaData.pais);
    formData.append('region', depaData.region);
    formData.append('provincia', depaData.provincia);
    formData.append('distrito', depaData.distrito);
    formData.append('direccion', depaData.direccion);
    formData.append('latitud', depaData.latitud ? depaData.latitud.toString() : '');
    formData.append('longitud', depaData.longitud ? depaData.longitud.toString() : '');
    formData.append('costoTotal', depaData.costoTotal.toString());
    formData.append('costoInicial', depaData.costoInicial.toString());

    this.fotos.forEach((file, index) => {
      formData.append('fotos', file, file.name);
    });

    const token = localStorage.getItem('token') || '';

    this.agenteService.modificarDepartamento(this.PropiedadId, formData, token).subscribe(
      response => {
        alert('Departamento modificado exitosamente');
        this.router.navigate(['/gestionarPropiedades']);
      },
      error => {
        console.error('Error al modificar el Departamento', error);
        this.router.navigate(['/gestionarPropiedades']);
        
      }
    );
  }

}
