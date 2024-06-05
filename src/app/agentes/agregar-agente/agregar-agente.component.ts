import { Component } from '@angular/core';

@Component({
  selector: 'app-gestionar-agente',
  standalone: true,
  imports: [],
  templateUrl: './agregar-agente.component.html',
  styleUrls: ['./agregar-agente.component.css']
})
export class AgregarAgenteComponent {
  selectedImage: string | ArrayBuffer | null = null;

  onAgregar() {
    // logica backend?
  }

  onCancel() {
    this.selectedImage = null;
  }

  triggerFileInput() {
    console.log('triggerFileInput called'); // Debug
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        console.error('Selected file is not an image');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onAdd() {
    console.log('Agregar');
    // Lógica para agregar la foto
  }
}
