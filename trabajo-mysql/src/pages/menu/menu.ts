import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioPage } from '../usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {


  datos={
    email:'',
    password:''
  };
  item : Array<any> = [];
  apiUrl='http://181.114.114.160/aventon/procesos/';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  

  listar(){
    this.http.get(this.apiUrl+'retrieve.php').subscribe(
      (data : any) => {
        console.log(data);
        this.item = data;
        console.log(this.item);
      },(error : any) => {
        console.log(error);
      });
  }

  insertar(){
    let nuevo={
      "key": "registrarUsuario",
      "email":this.datos.email,
      "password":this.datos.password
    };
    console.log(this.datos);
    
    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(nuevo);
    
    this.http.post(this.apiUrl+"pruebaInsert.php", opsi, header).subscribe(
      data => {
        console.log(data);
        console.log('exito');
        
        
        }, (error: any)=> {
          console.log('error');
          
    });
    this.datos.email='';
    this.datos.password='';
  }
  actualizar(){
    let datos={
      "key": "edit",
      "email":"holamundo@ucb.com"
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
  }
  irUsuario(usuario)
  {
    this.navCtrl.push(UsuarioPage,{user:usuario});
  }
}
