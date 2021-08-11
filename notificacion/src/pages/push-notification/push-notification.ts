import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { OneSignal, OSNotification } from '@ionic-native/onesignal';

/**
 * Generated class for the PushNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-push-notification',
  templateUrl: 'push-notification.html',
})
export class PushNotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pl:Platform,public one:OneSignal) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PushNotificationPage');
  }
  
  enviar()
  {
    let obj={
      headings:{en:"Mensaje Nuevo"},
      contents:{en:"hola mundo."},
      include_player_id:["8fd569bb-7eb1-4c99-8145-56cfca6227b7"] //jessy
    };
    this.one.postNotification(obj).then(
      ()=>{

      }
    ).catch(
      (error)=>{
        console.log(error);
        
      }
    );
  }
}
