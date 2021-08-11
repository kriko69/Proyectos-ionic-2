import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  public historial:ScanData[]=[];


  constructor() {
  }

  agregarHistorial(texto:string)
  {
    let data = new ScanData(texto);
    this.historial.unshift(data);
    console.log(this.historial);
    
  }

  cargarHistorial()
  {
    return this.historial;
  }
}
