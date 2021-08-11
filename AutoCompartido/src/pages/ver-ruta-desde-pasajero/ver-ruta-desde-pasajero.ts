import { HomePasajeroPage } from './../home-pasajero/home-pasajero';
import { MarkadorPage } from './../markador/markador';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import { NavController, Platform, NavParams, AlertController,ModalController } from 'ionic-angular';

//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';
import { UbicacionService } from '../../providers/ubicacion/ubicacion';
import { ToastService } from '../../services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { PuntoRecogidaPage } from '../punto-recogida/punto-recogida';
declare var google: any;
/**
 * Generated class for the VerMiRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-ver-ruta-desde-pasajero',
  templateUrl: 'ver-ruta-desde-pasajero.html',
})
export class VerRutaDesdePasajeroPage {
  bigboy=false;
  diferentes=[];
  latitud;
  longitud;
   auxdif=[];
  suscrito1:ISubscription;
  parar=true;
  marka:any;
  capacidad;
  cadenaaaa='';
  email='';
  ruta='';
  map: any;
  ii;
  pasajeros='';
  markersArray=[];
  contador=0;
  markeraux:any; 
  extra:any;
  otro:any;
  latUCB  = -16.523098;
longUCB = -68.112290;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast:ToastService,public servicio:firebaseService) {
      this.latitud=this.navParams.get('latitud');
      this.longitud=this.navParams.get('longitud');
    this.email = this.navParams.get('email');
    this.otro = this.navParams.get('otro');
    this.capacidad = this.navParams.get('capacidad');
  this.ruta = this.navParams.get('ruta');
  }

  ionViewDidLoad() {
   // this.loadMap(this.latUCB,this.longUCB);
   this.loadMap(this.latUCB,this.longUCB);
  }
  private loadMap(latOri, lngOri) {
    let rutaac;
    let caux:any;
    this.suscrito1=this.servicio.getActivas1().valueChanges().subscribe(
      data =>{
        for(caux of data)
        {
          console.log(data);
          if(caux.email==this.otro){
            this.diferentes.push(caux);
          }
        }
        console.log(this.diferentes);
        this.ii=this.diferentes.length-1;
    console.log(this.ii);
    this.sesa();
      }
    );
    this.auxdif=this.diferentes;
  }

  sesa(){
    this.markersArray=[];
   
   if(this.diferentes[this.ii].pasajeros!='' && this.diferentes[this.ii].pasajeros!=null){
       this.pasajeros=this.diferentes[this.ii].pasajeros;}
   let latlon=this.diferentes[this.ii].ruta.split(';');
   let aux:any;
   console.log(latlon);
   let puntos=latlon.length;
   console.log(puntos);

   for(let i=0;i<puntos;i++)
   {
     aux=latlon[i];
     let partida=aux.split('/');
     this.markeraux = new google.maps.Marker({position: {lat: Number(partida[0]), lng: Number(partida[1])},map: this.map,draggable: false});
     console.log(Number(partida[0])+'/'+Number(partida[1]));
     if(i!=0 && i!=puntos-1){
       if(this.diferentes[this.ii].recogidas!=null){
         let paradas=this.diferentes[this.ii].recogidas.split(';');
         let bol=false;
         for(let i=0;i<paradas.length;i++)
         {
           if(paradas[i]==aux)
           {
             this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/micons/blue-dot.png');
             bol=true;
           }
         }
         if(bol==false)
         {
           this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
         }
 
       }
       else{
         this.markeraux.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
       }
     }
     this.markersArray.push(this.markeraux);
   }


   var directionsService = new google.maps.DirectionsService;
     var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById('maparuta'), {
     center: {lat: this.latUCB, lng: this.longUCB},
     zoom:10
   });
   let waypts=[];
   for(let i=0;i<puntos;i++){
   waypts.push({
     location: this.markersArray[i].getPosition(),
     stopover: false
   });}
   console.log(waypts);
   directionsDisplay.setMap(this.map);
    var start = this.markersArray[0].getPosition();
    var end = this.markersArray[puntos-1].getPosition();
    var request = {
     origin: start,
     destination: end,
     travelMode: 'DRIVING',
     waypoints: waypts
   };
   directionsService.route(request, function(result, status) {
     if (status == 'OK') {
       directionsDisplay.setDirections(result);
     }
   });
   for(let i=1;i<puntos-1;i++){
     this.markersArray[i].setMap(this.map);
   }
   let latemail=this.otro.split('.');    
   this.marka = new google.maps.Marker({position: {lat: Number(0), lng: Number(0)},map: this.map,draggable: false});
   this.suscrito1=this.servicio.latlong(latemail[0]).valueChanges().subscribe(
   data =>{
     console.log(data[0]);
       this.marka.setMap(null);
       this.marka = new google.maps.Marker({position: {lat: Number(data[0]), lng: Number(data[1])},map: this.map,draggable: false});
       this.marka.setIcon('http://maps.google.com/mapfiles/ms/micons/cabs.png');
       if(this.bigboy==false)
       this.marka.setMap(this.map);
     
   }
 );
}

  para(){
      console.log('ROMAAAAAAAA');
      let aux=this.diferentes[this.ii].ruta.split(';');
      let varia=this.latitud+'/'+this.longitud;
      var index = aux.indexOf(varia);
      if (index > -1) {
        aux.splice(index, 1);
      }
      let cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].ruta=cadena;
      this.diferentes[this.ii].capacidad=this.diferentes[this.ii].capacidad+1;
      console.log(this.email);
      
      aux=this.diferentes[this.ii].pasajeros.split(';');
      varia=this.email;
      var index = aux.indexOf(varia);
      if (index > -1) {
        aux.splice(index, 1);
      }
      cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].pasajeros=cadena;

      aux=this.diferentes[this.ii].recogidas.split(';');
      varia=this.latitud+'/'+this.longitud;
      var index = aux.indexOf(varia);
      if (index > -1) {
        aux.splice(index, 1);
      }
      cadena='';
      for(let i=0;i<aux.length;i++){
        if(i!=aux.length-1)
        {
          cadena+=aux[i]+';';
        }
        else{
          cadena+=aux[i];
        }
      }
      this.diferentes[this.ii].recogidas=cadena;
      this.servicio.RutaActiva(this.diferentes[this.ii]);
      
      this.bigboy=true;
    this.diferentes=this.auxdif;
    this.suscrito1.unsubscribe();
        this.navCtrl.setRoot(PuntoRecogidaPage,{email: this.email,capacidad:this.capacidad});
  }
  fin(){
    this.navCtrl.setRoot(PuntoRecogidaPage,{email: this.email,capacidad:this.capacidad});
  }
}
