import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { firebaseService } from '../../services/firebase.service';
import { ISubscription } from "rxjs/Subscription";
import{HomePage} from '../home/home';
/**
 * Generated class for the BuzonPasajeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzon-pasajero',
  templateUrl: 'buzon-pasajero.html',
})
export class BuzonPasajeroPage {

  email;
  rama;
  solicitudes=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService) {
    this.email=this.navParams.get('email');
    this.rama=this.email.split('.');
    console.log(this.rama[0]);

    this.servicio.getMisSolicitudesRef(this.rama[0]).valueChanges().subscribe(
      info=>{
        this.solicitudes=info;
        console.log(info);
        
      }
    );
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzonPasajeroPage');
  }



  mostrar(solicitud)
  {
    console.log(solicitud);
    
  }
  calif(obj)
  {
    this.navCtrl.setRoot(HomePage,{email:this.email,obj:obj,rama:this.rama});
  }
}
