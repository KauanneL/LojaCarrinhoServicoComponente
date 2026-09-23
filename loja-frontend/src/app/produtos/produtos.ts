import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LojaService } from '../loja-service';
import { Produto } from '../models/produto';
import { Item } from '../models/item';
import { CarrinhoService } from '../services/carrinho-service';
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

  constructor(
    private lojaService: LojaService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos(): void {
    this.lojaService.obterTodos().subscribe({
      next: (dados: Produto[]) => {
        this.produtos = dados;
        this.cdr.detectChanges();
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
    const item: Item = {
      id: produto.id,
      produto: produto,
      quantidade: 1
    };

    this.carrinhoService.adicionarItem(item);
  }
}