import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string = 'Invitado';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getRole().subscribe(role => {
      this.role = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/index']).then(() => {
      window.location.reload();
    });
  }
}

