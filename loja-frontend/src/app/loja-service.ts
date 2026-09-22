import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Produto = {
  id: number;
  nome: string;
  marca: string;
  descrição: string;
  preço: number;
  foto: string;
  quantidade: number;
};

export type Item = {
  id: number;
  produto: Produto;
  quantidade: number;
};

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private url = 'http://localhost:3000/produtos';

  itens = signal<Item[]>([]);

  constructor(private http: HttpClient) {}

  obterTodos() {
    return this.http.get<Produto[]>(this.url);
  }

  obterPorId(id: number) {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  adicionarItem(produto: Produto): void {

    const itemExistente = this.itens().find(
      item => item.id === produto.id
    );

    if (itemExistente) {

      this.itens.update(itens =>
        itens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );

    } else {

      this.itens.update(itens => [
        ...itens,
        {
          id: produto.id,
          produto: produto,
          quantidade: 1
        }
      ]);

    }
  }

  aumentarQuantidade(id: number): void {

    this.itens.update(itens =>
      itens.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );

  }

  diminuirQuantidade(id: number): void {

    this.itens.update(itens =>
      itens.map(item =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );

  }

  removerItem(id: number): void {

    this.itens.update(itens =>
      itens.filter(item => item.id !== id)
    );

  }

  obterTotal(): number {

    return this.itens().reduce(
      (total, item) =>
        total + item.produto.preço * item.quantidade,
      0
    );

  }
}