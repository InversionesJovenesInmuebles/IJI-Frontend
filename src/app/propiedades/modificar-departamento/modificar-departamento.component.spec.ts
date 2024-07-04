import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDepartamentoComponent } from './modificar-departamento.component';

describe('ModificarDepartamentoComponent', () => {
  let component: ModificarDepartamentoComponent;
  let fixture: ComponentFixture<ModificarDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarDepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
