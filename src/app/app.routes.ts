import { Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {IniciarSesionClienteComponent} from "./auth/iniciar-sesion-cliente/iniciar-sesion-cliente.component";
import {IniciarSesionAgenteComponent} from "./auth/iniciar-sesion-agente/iniciar-sesion-agente.component";
import {IniciarSesionInmobiliariaComponent} from "./auth/iniciar-sesion-inmobiliaria/iniciar-sesion-inmobiliaria.component";
import {AgregarAgenteComponent} from "./agentes/agregar-agente/agregar-agente.component";
import {ModificarAgenteComponent} from "./agentes/modificar-agente/modificar-agente.component";
import {GestionarAgenteComponent} from "./agentes/gestionar-agente/gestionar-agente.component";
import {PerfilAgenteComponent} from "./agentes/perfil-agente/perfil-agente.component";
import {GestionarPropiedadesComponent} from "./propiedades/gestionar-propiedades/gestionar-propiedades.component";
import {ModificarPropiedadComponent} from "./propiedades/modificar-propiedad/modificar-propiedad.component";
import {PropiedadesComponent} from "./pages/propiedades/propiedades.component";
import { VerPropiedadComponent } from './pages/ver-propiedad/ver-propiedad.component';
import {AgregarCasaComponent} from "./propiedades/agregar-casa/agregar-casa.component";
import {AgregarDepartamentoComponent} from "./propiedades/agregar-departamento/agregar-departamento.component";
import {RegistrarseComponent} from "./auth/registrarse/registrarse.component";

export const routes: Routes = [

  {
    path: 'index',
    title: 'Index',
    component: IndexComponent,
  },
  {
    path:'iniciarSesionCliente',
    title:'Iniciar Sesión Cliente',
    component: IniciarSesionClienteComponent,
  },
  {
    path:'registrarse',
    title:'Registrarse',
    component: RegistrarseComponent,
  },
  {
    path:'iniciarSesionAgente',
    title:'Iniciar Sesión Agente',
    component:IniciarSesionAgenteComponent,
  },
  {
    path:'iniciarSesionInmobiliaria',
    title:'Iniciar Sesión Inmobiliaria',
    component:IniciarSesionInmobiliariaComponent,
  },
  {
    path:'agregarAgente',
    title:'Agregar Agente',
    component: AgregarAgenteComponent,
  },
  {
    path:'modificarAgente',
    title:'Modificar Agente',
    component: ModificarAgenteComponent,
  },
  {
    path:'gestionarAgente',
    title:'Gestionar Agente',
    component: GestionarAgenteComponent,
  },
  {
    path:'perfilAgente',
    title:'Perfil Agente',
    component: PerfilAgenteComponent,
  },
  {
    path:'gestionarPropiedades',
    title:'Gestionar Propiedades',
    component:GestionarPropiedadesComponent,
  },
  {
    path:'agregarCasa',
    title:'Agregar Casa',
    component: AgregarCasaComponent,
  },
  {
    path:'agregarDepartamento',
    title:'Agregar Departamento',
    component: AgregarDepartamentoComponent,
  },
  {
    path:'modificarPropiedad',
    title:'Modificar Propiedad',
    component: ModificarPropiedadComponent,
  },
  {
    path:'propiedades',
    title:'Propiedades',
    component:PropiedadesComponent,
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path:'verPropiedad',
    title:'Ver Propiedad',
    component:VerPropiedadComponent,
  },
];
