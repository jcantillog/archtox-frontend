import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacologicalGroupPage } from './pharmacological-group';

@NgModule({
  declarations: [
    PharmacologicalGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacologicalGroupPage),
  ],
})
export class PharmacologicalGroupPageModule {}
