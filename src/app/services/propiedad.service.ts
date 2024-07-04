import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Propiedad} from "../interfaces/propiedad";
import {AgenteService} from "./agente.service";
import {Agente} from "../interfaces/agente";
import {CasaModificar} from "../interfaces/casa-modificar";
import {DepartamentoModificar} from "../interfaces/departamento-modificar";

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private baseUrl = 'http://localhost:8083/propiedad';

  constructor(private http: HttpClient, private agenteService: AgenteService) { }


  listarPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.baseUrl}/listarPropiedades`);
  }

  obtenerPropiedadPorId(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.baseUrl}/listarPropiedad/${id}`);
  }

  obtenerCasaPorId(id: number): Observable<CasaModificar> {
    return this.http.get<CasaModificar>(`${this.baseUrl}/listarPropiedad/${id}`);
  }

  obtenerDepartamentoPorId(id: number): Observable<DepartamentoModificar> {
    return this.http.get<DepartamentoModificar>(`${this.baseUrl}/listarPropiedad/${id}`);
  }

  listarPropiedadesAgente(): Observable<Propiedad[]> {
    return new Observable<Propiedad[]>((observer) => {
      this.agenteService.obtenerDatosAgente().subscribe((agente: Agente) => { // Aquí especificamos el tipo Agente
        this.http.get<Propiedad[]>(`${this.baseUrl}/listarPropiedadesAgente/${agente.idAgente}`).subscribe(
          (propiedades) => {
            observer.next(propiedades);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      });
    });
  }


}
