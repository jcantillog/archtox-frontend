import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DrugInfoPage} from "../drug-info/drug-info";

@IonicPage()
@Component({
  selector: 'page-drug',
  templateUrl: 'drug.html',
})
export class DrugPage {

  private search: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private toastCtrl: ToastController) {}

  showToast(){
    let toast = this.toastCtrl.create({
        message: 'Deslice a la izquierda sobre un fármaco para mas opciones.',
        duration: 2000
    });
    toast.present();
  }

  toSearch(option: boolean){
      if(option) this.search = true;
      else this.search = false;
  }

  newDrug(){
      this.navCtrl.push(DrugInfoPage, {option: 'Nuevo'});
  }

  /*onDrag(item: any) {
        let percent = item.getSlidingPercent();
        if (percent > 10) {
           alert('overscroll');
        }
    }*/
}
