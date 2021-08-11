import { OpcionesConductorPage } from './../opciones-conductor/opciones-conductor';
import { MarkadorPage } from './../markador/markador';
import { rutaactiva } from './../../interfaces/rutactiva.service';
import { firebaseService } from './../../services/firebase.service';
import { Component, NgModule } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, ModalController, App } from 'ionic-angular';

//IMPORTAR GEOLOCALIZACIÓN DE GOOGLE
import { Geolocation } from '@ionic-native/geolocation';
import{Ruta} from '../../interfaces/rutas.interface';
import { AddRutaPage } from '../add-ruta/add-ruta';
import { UbicacionService } from '../../providers/ubicacion/ubicacion';
import { ToastService } from '../../services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { ConductorPage } from '../conductor/conductor';
import { IfStmt } from '@angular/compiler';
declare var google: any;
/**
 * Generated class for the VerMiRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-ver-mi-ruta',
  templateUrl: 'ver-mi-ruta.html',
})
export class VerMiRutaPage {
   ii;
  bigboy=false;
  diferentes=[];
   auxdif=[];
  suscrito1:ISubscription;
  parar=true;
  marka:any;
  capacidad;
  cadenaaaa='';
  email='';
  ruta='';
  map: any;
  markersArray=[];
  contador=0;
  markeraux:any; 
  extra:any;
  latUCB  = -16.523098;
  pasajeros='';
longUCB = -68.112290;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast:ToastService,private _ubicacion:UbicacionService,public servicio:firebaseService,public app:App) {
    this.email = this.navParams.get('email');
    console.log('CORRREEEEEEROOOOO: '+this.email);
    
    this.capacidad = this.navParams.get('capacidad');
  this.ruta = this.navParams.get('ruta');
  let flag=false;
  this._ubicacion.iniciar_localizacion(this.email);
  }

  ionViewDidLoad() {
   // this.loadMap(this.latUCB,this.longUCB);
   try{
   this.loadMap(this.latUCB,this.longUCB);}
   catch(err){}
  }
  private loadMap(latOri, lngOri) {
    let rutaac;
    let caux:any;
    this.suscrito1=this.servicio.getActivas1().valueChanges().subscribe(
      data =>{
        for(caux of data)
        {
          console.log(data);
          if(caux.email==this.email){
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
    this.map = new google.maps.Map(document.getElementById('mapas'), {
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
   let latemail=this.email.split('.');    
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
    this._ubicacion.cortar_localizacion();/*
    let aux= this.diferentes[].pasajeros.split(';');
    let correos=[];
    let aux2;
    for(let i=0;i<aux.length;i++){
      aux2=aux[i].split('.');
      correos.push(aux2[0]);
    }
    let mensaje={
      de:this.email,
      estado:'calificame',
      mensaje:'Buen viaje?'
    };
    for(let i=0;i<aux2.length;i++){
      this.servicio.calificar(aux2[i],mensaje);
    }*/



      this.bigboy=true;
      let y=this.pasajeros.split(';');

      console.log(y);
      
      this.calificar(this.pasajeros);
    this.diferentes=this.auxdif;
    this.suscrito1.unsubscribe();
    let aux=this.email.split('.');
    var nav = this.app.getRootNav();
    nav.setRoot(ConductorPage,{email: this.email,capacidad:this.capacidad});
  }
  calificar(correos:string){
    let mensaje1={
    fecha:this.dameFecha(),
    estado:'No Calificado',
    mensaje:'CALIFICAME!!!',
    emails:correos
  }
  let co=this.email.split('.');
  console.log('fkyghujik'+correos);
  if(mensaje1.emails!=''){
  this.servicio.calificarpasa(co[0],mensaje1);

    let aux=correos.split(';');
    for(let i=0;i<aux.length;i++){
      let auxi=aux[i].split('.');
      let mensaje={
        de:this.email,
        fecha:this.dameFecha(),
        estado:'No Calificado',
        mensaje:'CALIFICAME!!!'
      }
      console.log('915613489   '+auxi[0]);
      
      this.servicio.calificarcond(auxi[0],mensaje);

    }
  }
  }
  dameFecha()
  {
    let hoy = new Date();
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();
    let hora=''+hoy.getHours();
    let minutos=''+hoy.getMinutes();
    let segundos=''+hoy.getSeconds();
    if(hoy.getHours()<10)
      hora='0'+hora;
    if(hoy.getMinutes()<10)
      minutos='0'+minutos;
    if(hoy.getSeconds()<10)
      segundos='0'+segundos;
    let date=dd+'-'+mm+'-'+yyyy+'|'+hora+':'+minutos+':'+segundos;
    return date;
  }




}
