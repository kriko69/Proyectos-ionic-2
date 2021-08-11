import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nombre:any;
  minombre;
  constructor(public navCtrl: NavController, public parametro:NavParams,
    public sm:StreamingMedia) {
    
  }

  video()
  {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait'
    };
    
    this.sm.playVideo('http://www.opticodec.com/test/tropic.mp4', options);
  }
}
