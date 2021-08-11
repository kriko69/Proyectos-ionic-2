import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PushNotificationPage } from '../pages/push-notification/push-notification';
import { OneSignal } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  id;
  tokens;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public one:OneSignal) {
    platform.ready().then(() => {
      this.one.startInit("153d6bee-2376-485a-a606-dba9ce331037","526910337563");
      this.one.inFocusDisplaying(this.one.OSInFocusDisplayOption.InAppAlert);

      this.one.setSubscription(true); //alta del telefono
      this.one.getIds().then( //obtener los id y token unicos
        (ids)=>{
          this.id=ids.userId;
          this.tokens=ids.pushToken;
          
        }
      );

      this.one.handleNotificationReceived().subscribe(
        (data)=>{
              
          //que pasa cuando se recibe evento
        }
      );

      this.one.handleNotificationOpened().subscribe(
        (data)=>{
          data.notification.payload.title;//titulo de la notificacion
          data.notification.payload.body; //cuerpo de la notificacion
          //que pasa cuando se abre la notificacion evento
        }
      );

           

      this.one.endInit();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


    });
  }
}

