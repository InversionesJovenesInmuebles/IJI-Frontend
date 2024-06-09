import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {LoginRequest} from "../../interfaces/login-request";
import {AuthResponse} from "../../interfaces/auth-response";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-iniciar-sesion-cliente',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './iniciar-sesion-cliente.component.html',
  styleUrls: ['./iniciar-sesion-cliente.component.css']
})
export class IniciarSesionClienteComponent {

  loginRequest: LoginRequest = { correo: '', contrasena: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response: AuthResponse) => {
        // Handle successful login, e.g., store token and navigate
        console.log('Login successful', response);
        // Navigate to another page
        this.router.navigate(['/propiedades']);
      },
      error: (err) => {
        // Handle login error
        this.errorMessage = 'Login failed: ' + (err.error.message || 'Unknown error');
      }
    });
  }
}
