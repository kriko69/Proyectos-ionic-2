import { firebaseService } from './../../services/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController} from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { login } from '../../interfaces/login.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { TipoUsuarioPage } from '../tipo-usuario/tipo-usuario';

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

  splash=true; //SPLASh
  tabBarElement: any; //SPLASH

  user= {} as login;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth, public alerta:AlertController,
  public pla:Platform, public load:LoadingController, public servicio:firebaseService) {

      //this.tabBarElement=document.querySelector('.tabbar');

  }
  ionViewDidLoad(){
    //this.tabBarElement.style.display='none';
    setTimeout(()=>{
      this.splash=false;
      //this.tabBarElement.style.display='flex';

    },4000);
  }
  /*ionViewDidLoad() {
    this.pla.ready().then(()=>{

      this.afAuth.authState.subscribe(session=>{
        if(session){
          this.navCtrl.setRoot(TipoUsuarioPage);
      }
        else{
          this.navCtrl.setRoot(LoginPage);
        }
      });
    });
  }*/

  irRegistro()
  {
    this.navCtrl.push(RegistrarPage);
  }

  async ingresar(user:login)
  {
    this.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password).then(
      () => {
        setTimeout(()=>{
          let aux=this.user.email.split('.');
          this.servicio.agregarFechaIngreso(aux[0]);
          this.navCtrl.setRoot(TipoUsuarioPage,{email:this.user.email});
        },5000);
      },
      error => {
        this.presentLoading();
        setTimeout(()=>{
          this.mostrarAlerta();
          this.navCtrl.setRoot(LoginPage);
        },3000);
      }
    );;

  }

  presentLoading() {
    const loader = this.load.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  mostrarAlerta() {
    const alert = this.alerta.create({
      title: 'Datos incorrectos!',
      subTitle: 'Existe algun dato incorrecto por favor intente de nuevo.',
      buttons: ['OK']
    });
    alert.present();
  }


}
