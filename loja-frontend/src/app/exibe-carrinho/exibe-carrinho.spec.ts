import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExibeCarrinho } from './exibe-carrinho';

describe('ExibeCarrinho', () => {
  let component: ExibeCarrinho;
  let fixture: ComponentFixture<ExibeCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExibeCarrinho],
    }).compileComponents();

    fixture = TestBed.createComponent(ExibeCarrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
