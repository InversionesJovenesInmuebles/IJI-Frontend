import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private baseUrl = 'http://localhost:8080/fotos';

  constructor(private http: HttpClient) { }

  getFoto(filename: string): Observable<Blob> {
    const url = `${this.baseUrl}/${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}


