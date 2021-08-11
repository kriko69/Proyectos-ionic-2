import { MenuPage } from './../menu/menu';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  
  usuario={};
  apiUrl='https://ionic-web.000webhostapp.com/';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http:HttpClient) {
    this.usuario=this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
  }
  actualizar(usuario){
    let datos={
      "key": "editar",
      "id_usuario":usuario.id_usuario,
      "email":usuario.email,
      "password":usuario.password
    };
    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(datos);
    
    this.http.post(this.apiUrl+"manage.php", opsi, header).subscribe(
      data => {
        console.log(data);
        console.log('exito');
        
        
        }, (error: any)=> {
          console.log('error');
          
    });
    this.navCtrl.setRoot(MenuPage);
  }
  borrar(id){
    let datos={
      "key": "eliminar",
      "id_usuario":id
    };
    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(datos);
    
    this.http.post(this.apiUrl+"manage.php", opsi, header).subscribe(
      data => {
        console.log(data);
        console.log('exito');
        
        
        }, (error: any)=> {
          console.log('error');
          
    })
    this.navCtrl.setRoot(MenuPage);
  }
}
