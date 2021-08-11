import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public noti:LocalNotifications,
    public platform:Platform) {

  }

  notificar()
  {
    this.platform.ready().then(
      ()=>{
        this.noti.schedule({
          title:'Horario de Vaije',
          text: 'Tu viaje ya esta por comenzar idiota',
          trigger: {at: new Date(new Date().getTime() + 3600)},
          icon: '../../assets/imgs/icons8-facebook-50.png',
          smallIcon: '../../assets/imgs/icons8-facebook-50.png'
          
       });
      }
    );
  }

}
