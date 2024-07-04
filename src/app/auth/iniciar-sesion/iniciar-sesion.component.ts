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
  loginRequest: LoginRequest = { correo: '', contrasena: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response: AuthResponse) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        let navigateUrl = '/propiedades';
        if (response.role === 'Agente') {
          navigateUrl = '/gestionarPropiedades';
        } else if (response.role === 'Inmobiliaria') {
          navigateUrl = '/gestionarAgente';
        }
        this.router.navigate([navigateUrl]).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas. Por favor, intente de nuevo.';
      }
    });
  }
}
