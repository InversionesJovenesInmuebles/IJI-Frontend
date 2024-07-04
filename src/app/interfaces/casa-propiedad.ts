import { Propiedad } from './propiedad';

export interface Casa extends Propiedad {
  cantPisos: number;
  areaJardin: number;
  jardin: boolean;
  atico: boolean;
  sotano: boolean;
}
