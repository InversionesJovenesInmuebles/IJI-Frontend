import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Casa} from "../interfaces/casa";
import {Departamento} from "../interfaces/departamento";
import {AuthService} from "./auth.service";

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

  agregarCasa(formData: FormData): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}/agregarCasa`, formData, {
      headers: this.getHeaders(),
    });
  }

  modificarCasa(id: number, casa: Casa): Observable<string> {
    const formData = this.createCasaFormData(casa);
    return this.http.put<string>(
      `${this.baseUrl}/modificarCasa/${id}`,
      formData,
      {
        headers: this.getHeaders(),
      }
    );
  }

  eliminarCasa(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminarCasa/${id}`, {
      headers: this.getHeaders(),
    });
  }

  agregarDepartamento(departamento: Departamento): Observable<string> {
    const formData = this.createDepartamentoFormData(departamento);
    return this.http.post<string>(
      `${this.baseUrl}/agregarDepartamento`,
      formData,
      {
        headers: this.getHeaders(),
      }
    );
  }

  modificarDepartamento(
    id: number,
    departamento: Departamento
  ): Observable<string> {
    const formData = this.createDepartamentoFormData(departamento);
    return this.http.put<string>(
      `${this.baseUrl}/modificarDepartamento/${id}`,
      formData,
      {
        headers: this.getHeaders(),
      }
    );
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
