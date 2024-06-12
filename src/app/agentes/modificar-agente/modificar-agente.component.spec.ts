import { Component } from '@angular/core';

@Component({
  selector: 'app-modificar-agente',
  templateUrl: './modificar-agente.component.html',
  styleUrls: ['./modificar-agente.component.css']
})
export class ModificarAgenteComponent {
  // Datos pre-llenados para la simulación
  agente = {
    nombre: 'Pedro Jose',
    apellidos: 'Cuellar Ramirez',
    dni: '12345678',
    telefono: '999 999 999',
    correo: 'example@example.com',
    contrasena: 'password123',
    confirmarContrasena: 'password123',
    imagen: 'path/to/image.png' // Ruta a la imagen del agente
  };

  selectedImage: string | ArrayBuffer | null = this.agente.imagen;

  // Método para manejar la selección de archivo de imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.selectedImage = e.target!.result;
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Método para manejar la cancelación
  onCancel(): void {
    // Implementa la lógica de cancelación
    console.log('Cancelado');
  }

  // Método para manejar la adición
  onAgregar(): void {
    // Implementa la lógica de agregar/agente modificado
    console.log('Agente modificado:', this.agente);
  }

  // Método para disparar la selección de archivo
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
