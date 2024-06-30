import { Component } from '@angular/core'; // Importa el decorador de componente de Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa los módulos de formularios de Angular
import { Router, RouterLink } from '@angular/router'; // Importa el módulo de enrutamiento de Angular
import { LoginRequest } from '../../interfaces/login-request'; // Importa la interfaz LoginRequest
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { AuthResponse } from '../../interfaces/auth-response'; // Importa la interfaz AuthResponse
import { NgIf } from '@angular/common'; // Importa la directiva NgIf de Angular

@Component({
  selector: 'app-iniciar-sesion', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    FormsModule, // Importa el módulo de formularios
    ReactiveFormsModule, // Importa el módulo de formularios reactivos
    RouterLink, // Importa la directiva RouterLink
    NgIf // Importa la directiva NgIf
  ],
  templateUrl: './iniciar-sesion.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrl: './iniciar-sesion.component.css' // Ruta del archivo de estilos CSS del componente
})
export class IniciarSesionComponent {
  loginRequest: LoginRequest = { correo: '', contrasena: '' }; // Inicializa la solicitud de inicio de sesión con campos vacíos
  errorMessage: string = ''; // Inicializa el mensaje de error como una cadena vacía

  // Inyecta el servicio de autenticación y el enrutador en el constructor
  constructor(private authService: AuthService, private router: Router) { }

  // Método que se llama al enviar el formulario de inicio de sesión
  onSubmit() {
    this.authService.login(this.loginRequest).subscribe({
      // Si la autenticación es exitosa
      next: (response: AuthResponse) => {
        console.log('Login successful', response); // Imprime un mensaje de éxito en la consola
        localStorage.setItem('token', response.token); // Almacena el token en el almacenamiento local
        localStorage.setItem('role', response.role); // Almacena el rol en el almacenamiento local
      },
      // Si la autenticación falla
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas. Por favor, intente de nuevo.'; // Establece el mensaje de error
      }
    });
  }
}
