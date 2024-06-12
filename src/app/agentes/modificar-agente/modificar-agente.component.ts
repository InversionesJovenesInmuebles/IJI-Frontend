import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-agente',
  templateUrl: './modificar-agente.component.html',
  styleUrls: ['./modificar-agente.component.css']
})
export class ModificarAgenteComponent implements OnInit {
  agente = {
    nombre: 'Pedro Jose',
    apellidos: 'Cuellar Ramirez',
    dni: '12345678',
    telefono: '999 999 999',
    correo: 'example@example.com',
    contrasena: 'password123',
    confirmarContrasena: 'password123',
    imagen: '/assets/agentes_fotos/pedro.png' // Ruta a la imagen del agente
  };

  selectedImage: string | ArrayBuffer | null = this.agente.imagen;

  ngOnInit() {
    // Puedes cargar más datos aquí si es necesario
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.selectedImage = e.target!.result;
      reader.readAsDataURL(input.files[0]);
    }
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  onAgregar(): void {
    console.log('Agente modificado:', this.agente);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
