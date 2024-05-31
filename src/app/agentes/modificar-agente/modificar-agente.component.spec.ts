import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAgenteComponent } from './modificar-agente.component';

describe('ModificarAgenteComponent', () => {
  let component: ModificarAgenteComponent;
  let fixture: ComponentFixture<ModificarAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarAgenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
