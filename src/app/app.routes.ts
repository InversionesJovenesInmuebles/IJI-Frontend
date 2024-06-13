// app.routes.ts
import { Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {IniciarSesionComponent} from "./auth/iniciar-sesion/iniciar-sesion.component";
import {RegistrarseComponent} from "./auth/registrarse/registrarse.component";
import {authGuard} from "./guards/auth.guard";
import {ModificarAgenteComponent} from "./agentes/modificar-agente/modificar-agente.component";
import {GestionarAgenteComponent} from "./agentes/gestionar-agente/gestionar-agente.component";
import {PerfilAgenteComponent} from "./agentes/perfil-agente/perfil-agente.component";
import {GestionarPropiedadesComponent} from "./propiedades/gestionar-propiedades/gestionar-propiedades.component";
import {AgregarCasaComponent} from "./propiedades/agregar-casa/agregar-casa.component";
import {AgregarDepartamentoComponent} from "./propiedades/agregar-departamento/agregar-departamento.component";
import {ModificarPropiedadComponent} from "./propiedades/modificar-propiedad/modificar-propiedad.component";
import {PropiedadesComponent} from "./pages/propiedades/propiedades.component";
import {VerPropiedadComponent} from "./pages/ver-propiedad/ver-propiedad.component";
import {AgregarAgenteComponent} from "./agentes/agregar-agente/agregar-agente.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: 'index', title: 'Index', component: IndexComponent },

  { path: 'iniciarSesion', title: 'Iniciar Sesión', component: IniciarSesionComponent },

  { path: 'registrarse', title: 'Registrarse', component: RegistrarseComponent },

  { path: 'agregarAgente', title: 'Agregar Agente', component: AgregarAgenteComponent, canActivate: [authGuard], data: { expectedRoles: ['Inmobiliaria'] }},

  { path: 'modificarAgente', title: 'Modificar Agente', component: ModificarAgenteComponent, canActivate: [authGuard], data: { expectedRoles: ['Inmobiliaria'] }},

  { path: 'gestionarAgente', title: 'Gestionar Agente', component: GestionarAgenteComponent, canActivate: [authGuard], data: { expectedRoles: ['Inmobiliaria'] }},

  { path: 'perfilAgente', title: 'Perfil Agente', component: PerfilAgenteComponent, canActivate: [authGuard], data: { expectedRoles: ['Agente'] }},

  { path: 'gestionarPropiedades', title: 'Gestionar Propiedades', component: GestionarPropiedadesComponent, canActivate: [authGuard], data: { expectedRoles: ['Agente'] }},

  { path: 'agregarCasa', title: 'Agregar Casa', component: AgregarCasaComponent, canActivate: [authGuard], data: { expectedRoles: ['Agente'] }},

  { path: 'agregarDepartamento', title: 'Agregar Departamento', component: AgregarDepartamentoComponent, canActivate: [authGuard], data: { expectedRoles: ['Agente'] }},

  { path: 'modificarPropiedad', title: 'Modificar Propiedad', component: ModificarPropiedadComponent, canActivate: [authGuard], data: { expectedRoles: ['Agente'] }},

  { path: 'propiedades', title: 'Propiedades', component: PropiedadesComponent},

  { path: 'verPropiedad', title: 'Ver Propiedad', component: VerPropiedadComponent},

  { path: 'page-not-found', title: 'Página no encontrada', component: PageNotFoundComponent},

  { path: '', redirectTo: '/index', pathMatch: 'full'},

  { path: '**', redirectTo: '/page-not-found'}

];
