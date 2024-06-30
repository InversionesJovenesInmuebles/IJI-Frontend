import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa los módulos necesarios para las pruebas
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa los módulos de formularios de Angular
import { Router } from '@angular/router'; // Importa el módulo de enrutamiento de Angular
import { IniciarSesionComponent } from './iniciar-sesion.component'; // Importa el componente que será probado
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { of, throwError } from 'rxjs'; // Importa operadores de RxJS para manejar observables
import { ActivatedRoute } from '@angular/router'; // Importa el módulo de rutas activas de Angular
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject de RxJS

describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent; // Declara una variable para el componente
  let fixture: ComponentFixture<IniciarSesionComponent>; // Declara una variable para la instancia del fixture del componente
  let authServiceSpy: jasmine.SpyObj<AuthService>; // Declara una variable para el espía del AuthService
  let routerSpy: jasmine.SpyObj<Router>; // Declara una variable para el espía del Router
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>; // Declara una variable para el espía del ActivatedRoute

  beforeEach(async () => {
    // Crear espías para AuthService y Router
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']); // Crea un espía para el AuthService con el método 'login'
    const routerMock = jasmine.createSpyObj('Router', ['navigate']); // Crea un espía para el Router con el método 'navigate'
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => '123' // Mock para la ruta activa, retorna '123' para cualquier llamada a 'get'
        }
      }
    };

    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [IniciarSesionComponent, FormsModule, ReactiveFormsModule], // Importa los módulos necesarios para el componente
      providers: [
        { provide: AuthService, useValue: authServiceMock }, // Proporciona el espía de AuthService
        { provide: Router, useValue: routerMock }, // Proporciona el espía de Router
        { provide: ActivatedRoute, useValue: activatedRouteMock } // Proporciona el mock de ActivatedRoute
      ]
    }).compileComponents(); // Compila los componentes
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSesionComponent); // Crea la instancia del fixture del componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>; // Inyecta el espía de AuthService
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>; // Inyecta el espía de Router
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>; // Inyecta el espía de ActivatedRoute
    fixture.detectChanges(); // Detecta los cambios en el componente
  });

  // Verificar que el componente se crea correctamente
  it('should create the component', () => {
    expect(component).toBeTruthy(); // Verifica que el componente es creado correctamente
  });

  // Verificar que el formulario se inicializa con campos vacíos
  it('should initialize form with empty fields', () => {
    expect(component.loginRequest).toEqual({ correo: '', contrasena: '' }); // Verifica que los campos del formulario estén vacíos al inicializarse
  });

  // Verificar que AuthService.login se llama al enviar el formulario
  it('should call AuthService login method on form submit', () => {
    const loginResponse = { token: 'fake-token', role: 'Usuario' }; // Respuesta simulada de login
    authServiceSpy.login.and.returnValue(of(loginResponse)); // Configura el espía para retornar la respuesta simulada
    component.loginRequest = { correo: 'test@example.com', contrasena: 'password' }; // Define los valores del formulario
    component.onSubmit(); // Llama al método onSubmit del componente

    // Comprobar que el método login del AuthService se llama con los parámetros correctos
    expect(authServiceSpy.login).toHaveBeenCalledWith({ correo: 'test@example.com', contrasena: 'password' });
  });

  // Verificar que se maneja el error de inicio de sesión correctamente
  it('should handle login error', () => {
    authServiceSpy.login.and.returnValue(throwError('error')); // Configura el espía para retornar un error

    component.loginRequest = { correo: 'test@example.com', contrasena: 'password' }; // Define los valores del formulario
    component.onSubmit(); // Llama al método onSubmit del componente

    // Comprobar que el mensaje de error se establece correctamente en el componente
    expect(component.errorMessage).toBe('Credenciales incorrectas. Por favor, intente de nuevo.');
  });
});
