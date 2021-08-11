import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the GenerarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generar',
  templateUrl: 'generar.html',
})
export class GenerarPage {
  QRdata=null;
  createCode=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bs:BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarPage');
  }

  generate()
  {
    this.createCode=this.QRdata;
  }

}
