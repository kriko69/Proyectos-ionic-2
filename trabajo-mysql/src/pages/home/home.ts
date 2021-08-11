import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  datos={
    correo:'',
    password:''
  }
  baseUri:'http://localhost/crudIonic/index.php';
  apiUrl='http://localhost/crudIonic/cargar.php';
  constructor(public navCtrl: NavController,public http:HttpClient) {

  }

  logForm(){
    console.log(this.datos);
    this.http.get(this.apiUrl).subscribe(
      (data)=>{
        console.log(data);
        
      },
      (err)=>{
        console.log(err);
        
      }
    );
  }

  createEntry()
   {
        
    let datos={
      "key": "create",
      "email":"luchito@ucb.com",
      "password":"12345abc"
    };
    let header : any = new HttpHeaders({'Content-Type': 'application/json'}),
        opsi   : any = JSON.stringify(datos);
    
    this.http.post(this.baseUri, opsi, header).subscribe(
      data => {
      console.log(data);
      console.log('exito');
      
      
    }, (error: any)=> {
      console.log('error');
      
})
   }


}
