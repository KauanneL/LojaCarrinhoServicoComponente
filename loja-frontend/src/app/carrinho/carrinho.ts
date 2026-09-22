import { Component } from '@angular/core';
import { LojaService } from '../loja-service';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss'
})
export class Carrinho {

  constructor(public lojaService: LojaService) {}

  aumentar(id: number): void {
    this.lojaService.aumentarQuantidade(id);
  }

  diminuir(id: number): void {
    this.lojaService.diminuirQuantidade(id);
  }

  remover(id: number): void {
    this.lojaService.removerItem(id);
  }

  total(): number {
    return this.lojaService.obterTotal();
  }
}