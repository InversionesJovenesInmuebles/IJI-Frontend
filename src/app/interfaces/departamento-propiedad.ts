import { Propiedad } from './propiedad';

export interface Departamento extends Propiedad {
  pisos: number;
  interior: number;
  ascensor: boolean;
  areasComunes: boolean;
  areasComunesEspecificas: string;
}
