import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  #itens = signal<Item[]>([]);

  readonly itens = this.#itens.asReadonly();

  constructor() {
    let itensSessao = this.recuperarSessao();
    if(itensSessao) {
      this.#itens.set(itensSessao);
    }
  }

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
    ])
    this.salvarSessao();

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

    this.salvarSessao();
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

    this.salvarSessao();
    return true;
  }

  removerItem(item: Item): boolean {

    this.#itens.update(itens =>
      itens.filter(it => it.id !== item.id)
    );

    this.salvarSessao();
    return true;
  }

  obterTotal(): number {

    return this.#itens().reduce(
      (total, item) =>
        total + item.produto['preço'] * item.quantidade,
      0
    );
  }

  salvarSessao() {
    localStorage.setItem(
      'CARRINHO_LOJA_IFRN',
      JSON.stringify(this.#itens())
    )
  }

  recuperarSessao() {
    let itens = localStorage.getItem('CARRINHO_LOJA_IFRN');
    if (itens) {
      return JSON.parse(itens);
    }
    return null;
  }
}