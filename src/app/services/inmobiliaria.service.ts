import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterAgenteRequest} from "../interfaces/register-agente-request";
import {Observable} from "rxjs";
import {Agente} from "../interfaces/agente";

@Injectable({
  providedIn: 'root'
})
export class InmobiliariaService {

  private baseUrl: string = 'http://localhost:8080/inmobiliaria';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Agregar agente
  registrarAgente(request: RegisterAgenteRequest, token: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/registrarAgente`, request, { headers });
  }


  // Listar agentes por inmobiliaria
  listarAgentesInmobiliaria(nombreInmobiliaria: string): Observable<Agente[]> {
    const headers = this.getHeaders();
    return this.http.get<Agente[]>(`${this.baseUrl}/listarAgentes/${nombreInmobiliaria}`, { headers });
  }

  // Modificar agente
  modificarAgente(id: number, request: RegisterAgenteRequest): Observable<Agente> {
    const headers = this.getHeaders();
    return this.http.put<Agente>(`${this.baseUrl}/modificarAgente/${id}`, request, { headers });
  }

  // Eliminar agente
  eliminarAgente(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`, { headers });
  }

  // Listar a todos los agentes
  listarAgentes(): Observable<Agente[]> {
    const headers = this.getHeaders();
    return this.http.get<Agente[]>(`${this.baseUrl}/listarAgentes`, { headers });
  }
}

