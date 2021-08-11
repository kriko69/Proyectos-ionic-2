import { ReservaPasajeroPage } from './../reserva-pasajero/reserva-pasajero';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { VerProgramadasPasajeroPage } from '../ver-programadas-pasajero/ver-programadas-pasajero';

declare var google: any;
/**
 * Generated class for the PuntoRecogidaReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-punto-recogida-reserva',
  templateUrl: 'punto-recogida-reserva.html',
})
export class PuntoRecogidaReservaPage {

  map: any;
  markeraux:any;
  latOri  = -16.503720; 
  longOri = -68.131247;
  email='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation) {
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuntoRecogidaPage');
    this.geolocation.getCurrentPosition().then((result) => {
      this.latOri = result.coords.latitude;
      this.longOri = result.coords.longitude;
    }).catch(function(e) {
      console.log('2-error')
      alert('GPS desativado. Verifique!')
    });   
    this.loadMap(this.latOri,this.longOri);
  }
  private loadMap(latOri, lngOri) {
          var directionsDisplay = new google.maps.DirectionsRenderer;
         directionsDisplay = new google.maps.DirectionsRenderer();
         this.map = new google.maps.Map(document.getElementById('mapa'), {
           center: {lat: latOri, lng: lngOri},
           zoom:10
         });
         var miposicion = {lat: latOri, lng: lngOri};
         this.markeraux = new google.maps.Marker({position: miposicion,map: this.map,draggable: true});
         directionsDisplay.setMap(this.map);
       }
       posicion(){
        this.geolocation.getCurrentPosition().then((result) => {
          this.latOri = result.coords.latitude;
          this.longOri = result.coords.longitude;
        }).catch(function(e) {
          console.log('2-error')
          alert('GPS desativado. Verifique!')
        });   
        
    this.loadMap(this.latOri,this.longOri);
       }
       aceptar(){
        let latitud=this.markeraux.getPosition().lat();
        let longitud=this.markeraux.getPosition().lng();
        this.navCtrl.setRoot(VerProgramadasPasajeroPage,{email: this.email,latitud:latitud,longitud:longitud});
      }
      dismiss(){
        
        this.navCtrl.setRoot(ReservaPasajeroPage,{email: this.email});
      }
}
