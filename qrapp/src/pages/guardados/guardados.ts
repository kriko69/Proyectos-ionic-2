import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';
import { ScanData } from '../../models/scan-data.model';

/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  private historial:ScanData[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicio:HistorialProvider, public toast:ToastController) {
      this.historial=servicio.cargarHistorial();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardadosPage');
  }

  abrir(item:ScanData)
  {
    const toast = this.toast.create({
      message: ''+item.info,
      duration: 2500
    });
    toast.present();
  }
}
