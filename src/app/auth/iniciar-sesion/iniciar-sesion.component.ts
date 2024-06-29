import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginRequest} from "../../interfaces/login-request";
import {AuthService} from "../../services/auth.service";
import {AuthResponse} from "../../interfaces/auth-response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
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

