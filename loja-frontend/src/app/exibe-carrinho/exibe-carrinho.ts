import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../services/carrinho-service';

@Component({
  selector: 'app-exibe-carrinho',
  imports: [RouterLink],
  templateUrl: './exibe-carrinho.html',
  styleUrl: './exibe-carrinho.scss'
})
export class ExibeCarrinho {

  quantidadeItens = computed(() => {

    return this.carrinhoService.itens().reduce(
      (total, item) => total + item.quantidade,
      0
    );

  });

  constructor(private carrinhoService: CarrinhoService) {}
}