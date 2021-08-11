import { VerMiRutaPage } from './../ver-mi-ruta/ver-mi-ruta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,App} from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';

/**
 * Generated class for the ActivarRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activar-ruta',
  templateUrl: 'activar-ruta.html',
})
export class ActivarRutaPage {

  email;
  ruta;
  rama;
  capacidad;
  placa;
  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService, public alerta:AlertController) {
    this.email=navParams.get('email');
    this.ruta=navParams.get('ruta');
    this.capacidad=navParams.get('capacidad');
    this.placa=navParams.get('placa');
    console.log(this.email);
    console.log(this.ruta);
    let aux=this.email.split('.');
    let fecha=this.ruta.fecha.split('-');
    let hora=this.ruta.hora.split(':');
    this.rama=aux[0]+fecha[0]+fecha[1]+fecha[2]+hora[0]+hora[1];
    console.log(this.rama);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarRutaPage');
  }
  activar()
  {
    this.servicio.quitarRuta(this.rama);
    let pet=this.email.split('.');
    let activa={
      email:this.email,
    ruta:this.ruta.ruta,
    capacidad:this.ruta.capacidad,
    precio:this.ruta.precio
    };



    this.servicio.agregarRutaActiva(pet[0],activa);
   // this.mostrarAlerta();
    //this.navCtrl.setRoot(VerMiRutaPage,{email:this.email,capacidad:this.capacidad,ruta:this.ruta.ruta});
    var nav = this.app.getRootNav();
    nav.setRoot(VerMiRutaPage,{email: this.email,capacidad:this.capacidad,ruta:this.ruta.ruta});
  }
  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Ruta Activada!',
      subTitle: 'Ahora la ruta esta en modo activa',
      buttons: ['OK']
    });
    alert.present();
  }
}
