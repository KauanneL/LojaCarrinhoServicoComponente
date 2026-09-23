import { Component } from '@angular/core';
import { CarrinhoService } from '../services/carrinho-service';
import { Item } from '../models/item';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss'
})
export class Carrinho {

  constructor(public carrinhoService: CarrinhoService) {}

  aumentar(item: Item): void {
    this.carrinhoService.aumentarQuantidade(item);
  }

  diminuir(item: Item): void {
    this.carrinhoService.diminuirQuantidade(item);
  }

  remover(item: Item): void {
    this.carrinhoService.removerItem(item);
  }

  total(): number {
    return this.carrinhoService.obterTotal();
  }
}