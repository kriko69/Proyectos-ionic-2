import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public bs:BarcodeScanner,
    public toast:ToastController,public pl:Platform,
    public servicio:HistorialProvider, public ac:AlertController) {

  }

  scan()
  {
    if(!this.pl.is('cordova'))
    {
     return; 
    }
    this.bs.scan().then(barcodeData => {
      console.log("Result: " + barcodeData.text + "\n");
      console.log("Format: " + barcodeData.format + "\n");
      console.log("Cancelled: " + barcodeData.cancelled + "\n");
      if(barcodeData.text=='4875800')
      {
        this.showAlert();
      }
      if(!barcodeData.cancelled && barcodeData.text!=null) //no cacelo el scanner
      {
        this.servicio.agregarHistorial(barcodeData.text);
      }
     }).catch(err => {
         console.log('Error', err);
         this.mostrarError('Error '+err);
     });
  }
  mostrarError(mensaje:string) {
    const toast = this.toast.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }
  showAlert() {
    const alert = this.ac.create({
      title: 'Exito!',
      subTitle: 'Este es un pasajero de tu ruta!',
      buttons: ['OK']
    });
    alert.present();
  }

  sis2()
  {
    this.bs.scan().then(barcodeData => {
      let data=barcodeData.text.split('|');

      if(data[0]=='correo' && data[1]=='fecha' && data[2]=='hora')
      {
        this.showAlert();
      }
      if(!barcodeData.cancelled && barcodeData.text!=null) //no cacelo el scanner
      {
        this.servicio.agregarHistorial(barcodeData.text);
      }
     }).catch(err => {
         console.log('Error', err);
         this.mostrarError('Error '+err);
     });
  }
}
