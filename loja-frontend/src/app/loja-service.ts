import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './models/produto';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private url = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  obterTodos() {
    return this.http.get<Produto[]>(this.url);
  }

  obterPorId(id: number) {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }
}