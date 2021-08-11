import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO} from '@ionic-native/fingerprint-aio';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { TouchID } from '@ionic-native/touch-id';

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

  showButton:boolean = false;
  plataforma:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private finger:FingerprintAIO, private plt:Platform, public and:AndroidFingerprintAuth,
    public touchId:TouchID) {
      this.plt.registerBackButtonAction(
        ()=>{
          console.log('apreto atras');
          
        }
      );
      if(this.plt.is('ios'))
      {
        this.plataforma='ios';
      }else{
        if(this.plt.is('android'))
        {
          this.plataforma='android';
        }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    
    this.and.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.and.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
                this.navCtrl.setRoot(TabsPage);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
             this.navCtrl.setRoot(TabsPage);
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.and.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));

}

touchInit() {
  this.touchId.isAvailable()
    .then((response: any) => {
        console.log('TouchID is available!', response);
        return this.touchId.verifyFingerprint('Pon tu huella.');
    })
    .then((res: any) => {
        console.log('Ok', res)
        this.navCtrl.push(TabsPage);
    })    
    .catch((error: any) => {
        console.error('Error', error)
    });
  }

  loginIOS()
  {
    this.plt.ready().then(() => this.touchInit());
  }

}
