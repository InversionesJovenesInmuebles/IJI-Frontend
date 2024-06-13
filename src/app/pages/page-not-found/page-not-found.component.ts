import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private router: Router, private authService: AuthService) { }

  goToHome() {
    const role = this.authService.Role();
    let redirectUrl = '/index';  // default for 'Invitado' and 'Cliente'
    if (role === 'Agente') {
      redirectUrl = '/gestionarPropiedades';
    } else if (role === 'Inmobiliaria') {
      redirectUrl = '/gestionarAgente';
    }
    this.router.navigate([redirectUrl]);
  }
}
