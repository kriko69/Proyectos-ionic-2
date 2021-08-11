import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TextToSpeech } from '@ionic-native/text-to-speech';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data={
    texto:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tts:TextToSpeech) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  reproducir()
  {
    if(this.data.texto!="")
    {
      this.tts.speak({
        text:this.data.texto,
        locale: 'es-ES',
        rate: 1.5
      });
    }
  }
  parar()
  {
    this.tts.stop();
  }
  
  irHome()
  {
    this.navCtrl.push(HomePage);
  }

}
