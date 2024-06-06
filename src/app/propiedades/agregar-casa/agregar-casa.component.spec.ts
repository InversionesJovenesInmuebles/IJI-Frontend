import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCasaComponent } from './agregar-casa.component';

describe('AgregarCasaComponent', () => {
  let component: AgregarCasaComponent;
  let fixture: ComponentFixture<AgregarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCasaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
