import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';


@Injectable()
export class firebaseService{
    

    constructor(private db:AngularFireDatabase, private store:AngularFireStorage){


    }
    
    pruebaRef()
    {
        return this.db.list('/Usuario');
    }

    guardarImagen(correo,imagen:ImageData)
    {
        let fotoRef=this.store.ref(correo+'/perfil.png').put(imagen);
        
    }
}