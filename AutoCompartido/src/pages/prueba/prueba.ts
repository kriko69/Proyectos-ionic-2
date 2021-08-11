import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PruebaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prueba',
  templateUrl: 'prueba.html',
})
export class PruebaPage {

  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:firebaseService) {
    this.servicio.pruebaRef().valueChanges().subscribe(
      (datas)=>{
        console.log(datas);
        this.data=datas;
      }
    );


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebaPage');
  }
  editar()
  {
    for (let i = 0; i < this.data.length; i++) {
      console.log(this.data[i].fecha);


    }

  }

}
