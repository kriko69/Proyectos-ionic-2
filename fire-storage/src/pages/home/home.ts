import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Camera,CameraOptions } from '@ionic-native/camera';
import { firebaseService } from '../../services/firebase.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foto;
  constructor(public navCtrl: NavController,
    public camera:Camera, public toast:ToastController, public servicio:firebaseService) {

      this.servicio.pruebaRef().valueChanges().subscribe(
        (datas)=>{
          console.log(datas);
        }
      );

  }

  entrarGaleria()
  {
    let opciones:CameraOptions={
      quality:100, //calidad 0-100
      destinationType:this.camera.DestinationType.DATA_URL, //cargar desde la camara o galeria de fotos
      encodingType:this.camera.EncodingType.JPEG, //tipo de imagen
      mediaType:this.camera.MediaType.PICTURE, //tipo de media ALLMEDIA-PICTURE-VIDEO
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY, //de donde sacare la foto PHOTOLIBRARY-CAMERA-SAVEDPHOTOALBUM
      targetWidth:600, //ancho de la imagen
      correctOrientation:true //que lo ponga en la orientacion correcta

    };
    this.camera.getPicture(opciones).then(
      (ImageData)=>{
        this.foto='data:image/jpeg;base64,'+ImageData;
        console.log('se elige correctamente');
        console.log('FOTO: ',this.foto);
        
        
      },
      (err)=>{
        this.mostrarToast('No se a seleccionado imagen.');
        console.log('no elige fotito');
        
      }
    );

  }

  tomarConCamara()
  {
    let opciones:CameraOptions={
      quality:100, //calidad 0-100
      destinationType:this.camera.DestinationType.DATA_URL, //cargar desde la camara o galeria de fotos
      encodingType:this.camera.EncodingType.JPEG, //tipo de imagen
      mediaType:this.camera.MediaType.ALLMEDIA, //tipo de media ALLMEDIA-PICTURE-VIDEO
      sourceType:this.camera.PictureSourceType.CAMERA, //de donde sacare la foto PHOTOLIBRARY-CAMERA-SAVEDPHOTOALBUM
      targetWidth:1000, //ancho de la imagen
      targetHeight:1000, //alto de la imagen
      allowEdit:true, //permite editar la foto sacada
      saveToPhotoAlbum:true, //si quiero que la foto tomada se guarde en mi galeria
      correctOrientation:true //que lo ponga en la orientacion correcta,
      

    };
    this.camera.getPicture(opciones).then(
      (ImageData)=>{
        this.foto='data:image/jpeg;base64,'+ImageData;
        console.log('se elige correctamente');        
        
      },
      (err)=>{
        this.mostrarToast('No se a seleccionado imagen.');
        console.log('no elige fotito');
        
      }
    );

  }

  mostrarToast(mensaje)
  {
    let t=this.toast.create({
      message:mensaje,
      duration:3000,
      position:"botton"
    });
    t.present();
  }

  NoHayFoto(mensaje)
  {
    let t=this.toast.create({
      message:mensaje,
      duration:3000,
      position:"botton"
    });
    t.present();
  }

  borrar()
  {
    if(!this.foto)
    {
      this.NoHayFoto('No hay foto que quitar!');
    }else{
      this.foto=false;
    }
  }

}
