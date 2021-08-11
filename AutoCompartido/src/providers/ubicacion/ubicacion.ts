import { Usuario } from './../../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import{AngularFireList, AngularFireDatabase}  from 'angularfire2/database';

@Injectable()
export class UbicacionService {
  usuario={alat:0,along:0};
  watchId;
  constructor(private geolocation:Geolocation,public af:AngularFireDatabase) {
    console.log('Hello UbicacionProvider Provider');
  }
  iniciar_localizacion(email:string){
    let aux=email.split('.');
    // Add watch
this.watchId = navigator.geolocation.watchPosition((data) => {
  // do something with position
  this.usuario.alat=data.coords.latitude;
  this.usuario.along=data.coords.longitude;
  this.af.database.ref('RutaActiva/'+aux[0]+'/').update(this.usuario);
})

// Clear watch



   /* this.watch = this.geolocation.watchPosition();
this.watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude 
 // data.coords.longitude
  this.usuario.alat=data.coords.latitude;
  this.usuario.along=data.coords.longitude;
  this.af.database.ref('RutaActiva/'+aux[0]+'/').update(this.usuario);
});*/
  }
  cortar_localizacion(){
    navigator.geolocation.clearWatch(this.watchId);
  }
}
