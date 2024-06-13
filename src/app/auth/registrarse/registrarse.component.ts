import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.registerCliente(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/iniciarSesion']);
        },
        error: (err) => {
          console.error('Error en el registro', err);
        }
      });
    }
  }
}

