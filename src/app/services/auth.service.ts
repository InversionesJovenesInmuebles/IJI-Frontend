import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthResponse} from "../interfaces/auth-response";
import {LoginRequest} from "../interfaces/login-request";
import {RegisterClienteRequest} from "../interfaces/register-cliente-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
  }

  registerCliente(request: RegisterClienteRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/registrar/cliente`, request);
  }
}
