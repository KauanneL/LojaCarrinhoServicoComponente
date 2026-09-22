import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LojaService, Produto } from '../loja-service';
import { ExibeCarrinho } from '../exibe-carrinho/exibe-carrinho';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule, ExibeCarrinho],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss'
})
export class Produtos implements OnInit {

  produtos: Produto[] = [];
  idBusca: number | null = null;

  constructor(private lojaService: LojaService) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos(): void {
    this.lojaService.obterTodos().subscribe({
      next: (dados: Produto[]) => {
        this.produtos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }

  buscarProduto(): void {
    if (this.idBusca === null) {
      return;
    }

    this.lojaService.obterPorId(this.idBusca).subscribe({
      next: (produto: Produto) => {
        this.produtos = [produto];
      },
      error: (erro) => {
        console.error('Produto não encontrado:', erro);
        this.produtos = [];
      }
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.lojaService.adicionarItem(produto);
    console.log('Produto adicionado ao carrinho:', produto.nome);
  }
}