import { Component } from '@angular/core';
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    ToastController
} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {AntidoteModel} from "../../model/antidote.model";
import {AntidoteService} from "../../services/antidote.service";
import {AntidoteInfoPage} from "../antidote-info/antidote-info";

@Component({
  selector: 'page-antidote',
  templateUrl: 'antidote.html',
})
export class AntidotePage {
    private allantidotes: AntidoteModel[] = [];
    private antidotesforfilter: AntidoteModel[] = [];
    private noInfo: boolean = false;

    constructor(private modalCtrl: ModalController,
                private antidoteService: AntidoteService, private loadingCtrl: LoadingController,
                private toastCtrl: ToastController, private alertCtrl: AlertController,
                private events: Events) {}

    ngOnInit(){
        this.getAllAntidotes();
    }

    onSubmit(form: NgForm){
        let loader = this.loadingCtrl.create({
            content: "Agregando antídoto..."
        });
        loader.present();
        this.antidoteService.addAntidote(form.value.antidoto, form.value.descripcion)
            .subscribe(
                data => {
                    loader.dismiss();
                    this.showToast('Antídoto agregado con éxito!');
                    this.getAllAntidotes();
                    form.reset();
                },
                error => {
                    loader.dismiss();
                    if(error.status == 0){
                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Antídoto", 401);
                    } else {
                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Antídoto", error.status);
                    }
                }
            )
    }

    getAllAntidotes(){
        let loader = this.loadingCtrl.create({
            content: "Cargando antídotos..."
        });
        loader.present();
        this.antidoteService.getAntidotes()
            .subscribe(
                (data: any) => {
                    loader.dismiss();
                    this.allantidotes = data;
                    this.initializeItems();
                    if(typeof this.antidotesforfilter == 'undefined' || this.antidotesforfilter.length == 0) this.noInfo = true;
                    else this.noInfo = false;
                },
                error => {
                    loader.dismiss();
                    if(error.status == 0){
                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Antídoto", 401);
                    } else {
                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Antídoto", error.status);
                    }
                }
            )
    }

    showToast(info: string){
        let toast = this.toastCtrl.create({
            message: info,
            showCloseButton: true,
            closeButtonText: "OK"
        });
        toast.present();
    }

    initializeItems(){
        this.antidotesforfilter = this.allantidotes;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.antidotesforfilter = this.antidotesforfilter.filter((antidote) => {
                return (antidote.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

        if(typeof this.antidotesforfilter == 'undefined' || this.antidotesforfilter.length == 0) this.noInfo = true;
        else this.noInfo = false;
    }

    delete(antidote: AntidoteModel){
        let loader = this.loadingCtrl.create({
            content: "Eliminando antídoto..."
        });
        let alert = this.alertCtrl.create({
            title: 'Eliminar Antídoto',
            message: '¿Seguro que desea eliminar este antídoto?',
            buttons: [
                {
                    text: 'Eliminar',
                    handler: () => {
                        loader.present();
                        this.antidoteService.deleteAntidote(antidote._id)
                            .subscribe(
                                data => {
                                    loader.dismiss();
                                    this.getAllAntidotes();
                                },
                                error => {
                                    loader.dismiss();
                                    if(error.status == 0){
                                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Antídoto", 401);
                                    } else {
                                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Antídoto", error.status);
                                    }
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

    edit(antidote: AntidoteModel){
        const modal = this.modalCtrl.create(AntidoteInfoPage, {antidote: antidote});
        modal.present();
        modal.onDidDismiss((data) => {
            if(data){
                if(data == 'antidote'){
                    this.getAllAntidotes();
                }
            }
        })
    }
}
