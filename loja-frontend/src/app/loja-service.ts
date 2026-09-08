import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private url = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  obterTodos() {
    return this.http.get(this.url);
  }

  obterPorId(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
}