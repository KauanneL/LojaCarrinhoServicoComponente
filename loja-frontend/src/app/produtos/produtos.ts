import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LojaService } from '../loja-service';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss'
})
export class Produtos implements OnInit {

  produtos: any[] = [];
  idBusca: number | null = null;

  constructor(
    private lojaService: LojaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos(): void {
    this.lojaService.obterTodos().subscribe({
      next: (dados: any) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('ERRO:', erro);
      }
    });
  }

  buscarProduto(): void {

    if (this.idBusca === null) {
      return;
    }

    this.lojaService.obterPorId(this.idBusca).subscribe({
      next: (produto: any) => {
        this.produtos = [produto];
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Produto não encontrado:', erro);
        this.produtos = [];
        this.cdr.detectChanges();
      }
    });
  }
}