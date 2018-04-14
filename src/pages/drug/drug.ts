import {Component} from '@angular/core';
import {AlertController, Events, LoadingController, NavController, ToastController} from 'ionic-angular';
import {DrugInfoPage} from "../drug-info/drug-info";
import {DrugModel} from "../../model/drug.model";
import {FarmacoService} from "../../services/farmaco.service";
import {InfofarmacoService} from "../../services/infofarmaco.service";

@Component({
  selector: 'page-drug',
  templateUrl: 'drug.html',
})
export class DrugPage{

  private search: boolean = false;
  private alldrugs: DrugModel[] = [];
  private drugsforfilter: DrugModel[] = [];
  private noInfo: boolean = false;

  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController, private loadingCtrl: LoadingController,
              private farmacoService: FarmacoService, private alertCtrl: AlertController,
              private infoFarmacoService: InfofarmacoService, private events: Events) {}

  ionViewWillEnter(){
      this.getAllDrugs();
  }

  toSearch(option: boolean){
      if(option) {
          this.search = true;
      } else {
          this.search = false;
          this.initializeItems();
          this.noInfo = false;
      }
  }

  newDrug(){
      this.navCtrl.push(DrugInfoPage, {option: 'Nuevo'});
  }

  itemSelected(drug: DrugModel){
      this.navCtrl.push(DrugInfoPage, {option: 'Editar', drug: drug});
  }

  getAllDrugs(){
        let loader = this.loadingCtrl.create({
            content: "Cargando fármacos..."
        });
        loader.present();
        this.farmacoService.getFarmacos()
            .subscribe(
                (data: any) => {
                    loader.dismiss();
                    this.alldrugs = data;
                    this.initializeItems();
                    if(typeof this.drugsforfilter == 'undefined' || this.drugsforfilter.length == 0) this.noInfo = true;
                    else this.noInfo = false;
                },
                error => {
                    loader.dismiss();
                    if(error.status == 0){
                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                    } else {
                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                    }
                    //this.showToast('Ha ocurrido un error al momento de cargar los fármacos, por favor actualice la página.')
                }
            )
  }

  initializeItems(){
        this.drugsforfilter = this.alldrugs;
  }

  showToast(info: string){
        let toast = this.toastCtrl.create({
            message: info,
            showCloseButton: true,
            closeButtonText: "OK"
        });
        toast.present();
  }

  delete(drug: DrugModel){
        let loader = this.loadingCtrl.create({
            content: "Eliminando grupo farmacológico..."
        });
        let alert = this.alertCtrl.create({
            title: 'Eliminar Grupo',
            message: '¿Seguro que desea eliminar este fármaco?',
            buttons: [
                {
                    text: 'Eliminar',
                    handler: () => {
                        loader.present();
                        this.infoFarmacoService.getInfoFarmaco(drug._id)
                            .subscribe(
                                (data:any) => {
                                    this.infoFarmacoService.deleteInfoFarmaco(data._id)
                                        .subscribe(
                                            data => {
                                                this.farmacoService.deleteFarmaco(drug._id)
                                                    .subscribe(
                                                        data => {
                                                            loader.dismiss();
                                                            this.getAllDrugs();
                                                            this.showToast('Fármaco eliminado con éxito');
                                                        },
                                                        error => {
                                                            loader.dismiss();
                                                            if(error.status == 0){
                                                                this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                                            } else {
                                                                this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                                            }
                                                            //this.showToast('Ha ocurrido un error al momento de eliminar el fármaco, por favor intente de nuevo.')
                                                        }
                                                    )
                                            },
                                            error => {
                                                loader.dismiss();
                                                if(error.status == 0){
                                                    this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                                } else {
                                                    this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                                }
                                                //this.showToast('Ha ocurrido un error al momento de eliminar la ifnormación del fármaco, por favor intente de nuevo.')
                                            }
                                        )
                                },
                                error => {
                                    loader.dismiss();
                                    if(error.status == 0){
                                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                    } else {
                                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                    }
                                    //this.showToast('Ha ocurrido un error al momento de obtener la infromación del fármaco para eliminarlo, por favor intente de nuevo.')
                                }
                            )
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
  }

  getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.drugsforfilter = this.drugsforfilter.filter((drug) => {
                return (drug.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                        drug.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                        drug.molecula.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

        if(typeof this.drugsforfilter == 'undefined' || this.drugsforfilter.length == 0) this.noInfo = true;
        else this.noInfo = false;
  }
}
