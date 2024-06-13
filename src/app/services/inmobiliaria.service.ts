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

  constructor(private http: HttpClient) {
  }

  // Agregar agente
  registrarAgente(request: RegisterAgenteRequest, token: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/registrarAgente`, request, { headers });
  }


  // Listar agentes por inmobiliaria
  listarAgentesInmobiliaria(nombreInmobiliaria: string): Observable<Agente[]> {
    return this.http.get<Agente[]>(`${this.baseUrl}/listarAgentes/Remax`);
  }

  // Modificar agente
  modificarAgente(id: number, request: RegisterAgenteRequest): Observable<Agente> {
    return this.http.put<Agente>(`${this.baseUrl}/modificarAgente/${id}`, request);
  }

  // Eliminar agente
  eliminarAgente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Listar a todos los agentes
  listarAgentes(): Observable<Agente[]> {
    return this.http.get<Agente[]>(`${this.baseUrl}/listarAgentes`);
  }
}
