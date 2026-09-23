import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  #itens = signal<Item[]>([]);

  readonly itens = this.#itens.asReadonly();

  adicionarItem(item: Item): boolean {

    const itemExistente = this.#itens().find(
      it => it.id === item.id
    );

    if (itemExistente) {
      this.aumentarQuantidade(item);
      return true;
    }

    this.#itens.update(itens => [
      ...itens,
      item
    ]);

    return true;
  }

  aumentarQuantidade(item: Item): boolean {

    this.#itens.update(itens =>
      itens.map(it =>
        it.id === item.id
          ? {
              ...it,
              quantidade: it.quantidade + 1
            }
          : it
      )
    );

    return true;
  }

  diminuirQuantidade(item: Item): boolean {

    this.#itens.update(itens =>
      itens.map(it =>
        it.id === item.id && it.quantidade > 1
          ? {
              ...it,
              quantidade: it.quantidade - 1
            }
          : it
      )
    );

    return true;
  }

  removerItem(item: Item): boolean {

    this.#itens.update(itens =>
      itens.filter(it => it.id !== item.id)
    );

    return true;
  }

  obterTotal(): number {

    return this.#itens().reduce(
      (total, item) =>
        total + item.produto['preço'] * item.quantidade,
      0
    );
  }
}