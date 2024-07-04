import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Casa} from "../interfaces/casa";
import {Departamento} from "../interfaces/departamento";
import {AuthService} from "./auth.service";
import {Agente} from "../interfaces/agente";
import {CasaModificar} from "../interfaces/casa-modificar";

@Injectable({
  providedIn: 'root'
})
export class AgenteService {
  private baseUrl = 'http://localhost:8080/agente';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || ''; // Obtener el token del localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  obtenerDatosAgente(): Observable<Agente> {
    return this.http.get<Agente>(`${this.baseUrl}/listarAgenteToken`, {
      headers: this.getHeaders(),
    });
  }

  agregarCasa(formData: FormData): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}/agregarCasa`, formData, {
      headers: this.getHeaders(),
    });
  }

  modificarCasa(id: number, casaData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/modificarCasa/${id}`, casaData, { headers });
  }

  eliminarCasa(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminarCasa/${id}`, {
      headers: this.getHeaders(),
    });
  }

  agregarDepartamento(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/agregarDepartamento`, formData, {
      headers: this.getHeaders(),
    });
  }

  modificarDepartamento(id: number, departamentoData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/modificarDepartamento/${id}`, departamentoData, { headers });
  }

  eliminarDepartamento(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/eliminarDepartamento/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  private createCasaFormData(casa: Casa): FormData {
    const formData = new FormData();
    Object.keys(casa).forEach((key) => {
      if (key === 'fotosUrls') {
        casa.fotosUrls.forEach((foto) => formData.append('fotos', foto));
      } else {
        formData.append(key, (casa as any)[key]);
      }
    });
    return formData;
  }

  private createDepartamentoFormData(departamento: Departamento): FormData {
    const formData = new FormData();
    Object.keys(departamento).forEach((key) => {
      if (key === 'fotosUrls') {
        departamento.fotosUrls.forEach((foto) =>
          formData.append('fotos', foto)
        );
      } else {
        formData.append(key, (departamento as any)[key]);
      }
    });
    return formData;
  }
}
