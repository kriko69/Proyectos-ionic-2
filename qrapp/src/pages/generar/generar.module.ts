import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerarPage } from './generar';

@NgModule({
  declarations: [
    GenerarPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerarPage),
  ],
})
export class GenerarPageModule {}
