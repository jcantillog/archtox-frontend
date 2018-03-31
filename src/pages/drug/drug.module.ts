import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugPage } from './drug';

@NgModule({
  declarations: [
    DrugPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugPage),
  ],
})
export class DrugPageModule {}
