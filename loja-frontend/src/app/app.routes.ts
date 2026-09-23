import { Routes } from '@angular/router';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    component: Produtos
  },
  {
    path: 'carrinho',
    component: Carrinho
  }
];