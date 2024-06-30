import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrarseComponent } from './registrarse.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs'; // Importa 'of' desde 'rxjs'

describe('RegistrarseComponent', () => {
  let component: RegistrarseComponent;
  let fixture: ComponentFixture<RegistrarseComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['registerCliente']);

    await TestBed.configureTestingModule({
      imports: [
        RegistrarseComponent, // Importa el componente standalone
        HttpClientTestingModule, // Módulo para manejar HttpClient en pruebas
        ReactiveFormsModule, // Módulo para formularios reactivos
        RouterTestingModule // Módulo para manejar rutas en pruebas
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarseComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    const form = component.registerForm;
    expect(form.get('correo')?.value).toBe('');
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('apellido')?.value).toBe('');
    expect(form.get('contrasena')?.value).toBe('');
    expect(form.get('telefono')?.value).toBe('');
    expect(form.get('dni')?.value).toBe('');
  });

  it('should not submit an invalid form', () => {
    const form = component.registerForm;
    form.controls['correo'].setValue('');
    form.controls['nombre'].setValue('');
    form.controls['apellido'].setValue('');
    form.controls['contrasena'].setValue('');
    form.controls['telefono'].setValue('');
    form.controls['dni'].setValue('');

    component.onSubmit();
    expect(authServiceSpy.registerCliente).not.toHaveBeenCalled();
  });

  it('should submit a valid form', () => {
    const form = component.registerForm;
    form.controls['correo'].setValue('test@example.com');
    form.controls['nombre'].setValue('Test');
    form.controls['apellido'].setValue('User');
    form.controls['contrasena'].setValue('password123');
    form.controls['telefono'].setValue('123456789');
    form.controls['dni'].setValue('12345678');

    const mockResponse = { token: 'fake-token', role: 'Usuario' }; // Respuesta simulada
    authServiceSpy.registerCliente.and.returnValue(of(mockResponse));

    component.onSubmit();
    expect(authServiceSpy.registerCliente).toHaveBeenCalled();
  });
});
