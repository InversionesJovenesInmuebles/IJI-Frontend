import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCasaComponent } from './modificar-casa.component';

describe('ModificarCasaComponent', () => {
  let component: ModificarCasaComponent;
  let fixture: ComponentFixture<ModificarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCasaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
