import {Component, OnInit} from '@angular/core';
import {
    AlertController,
    Events,
    LoadingController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PharmagroupService} from "../../services/pharmagroup.service";
import {GroupModel} from "../../model/group.model";

@Component({
    selector: 'page-pharmacological-group',
    templateUrl: 'pharmacological-group.html',
})
export class PharmacologicalGroupPage implements OnInit{

    private allgroups: GroupModel[] = [];
    private groupsforfilter: GroupModel[] = [];
    private noInfo: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private pharmagroupService: PharmagroupService, private loadingCtrl: LoadingController,
                private toastCtrl: ToastController, private alertCtrl: AlertController,
                private events: Events) {}

    ngOnInit(){
        this.getAllGroups();
    }

    onSubmit(form: NgForm){
        let loader = this.loadingCtrl.create({
            content: "Agregando grupo farmacológico..."
        });
        loader.present();
        this.pharmagroupService.addGroup(form.value.grupo)
            .subscribe(
                data => {
                    loader.dismiss();
                    this.showToast('Grupo farmacológico agregado con éxito!');
                    this.getAllGroups();
                    form.reset();
                },
                error => {
                    loader.dismiss();
                    if(error.status == 0){
                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                    } else {
                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                    }
                    //this.showToast('Ha ocurrido un error al momento de agregar el grupo, por favor intente de nuevo.')
                }
            )
    }

    getAllGroups(){
        let loader = this.loadingCtrl.create({
            content: "Cargando grupos farmacológicos..."
        });
        loader.present();
        this.pharmagroupService.getGroups()
            .subscribe(
                (data: any) => {
                    loader.dismiss();
                    this.allgroups = data;
                    this.initializeItems();
                    if(typeof this.groupsforfilter == 'undefined' || this.groupsforfilter.length == 0) this.noInfo = true;
                    else this.noInfo = false;
                },
                error => {
                    loader.dismiss();
                    if(error.status == 0){
                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                    } else {
                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                    }
                    //this.showToast('Ha ocurrido un error al momento de cargar los grupos, por favor actualice la página.')
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
        this.groupsforfilter = this.allgroups;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.groupsforfilter = this.groupsforfilter.filter((group) => {
                return (group.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

        if(typeof this.groupsforfilter == 'undefined' || this.groupsforfilter.length == 0) this.noInfo = true;
        else this.noInfo = false;
    }

    delete(group: GroupModel){
        let loader = this.loadingCtrl.create({
            content: "Eliminando grupo farmacológico..."
        });
        let alert = this.alertCtrl.create({
            title: 'Eliminar Grupo',
            message: '¿Seguro que desea eliminar este grupo farmacológico?',
            buttons: [
                {
                    text: 'Eliminar',
                    handler: () => {
                        loader.present();
                        this.pharmagroupService.deleteGroup(group._id)
                            .subscribe(
                                data => {
                                    loader.dismiss();
                                    this.getAllGroups();
                                },
                                error => {
                                    loader.dismiss();
                                    if(error.status == 0){
                                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                    } else {
                                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                    }
                                    //this.showToast('Ha ocurrido un error al momento de eliminar el grupo, por favor intente de nuevo.')
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

    edit(group: GroupModel){
        let loader = this.loadingCtrl.create({
            content: "Editando grupo farmacológico..."
        });
        let alert = this.alertCtrl.create({
            title: 'Editar Grupo',
            message: '¿Seguro que desea editar este grupo farmacológico?',
            inputs: [
                {
                    name: 'nuevo_grupo',
                    value: group.nombre,
                    placeholder: 'Nuevo nombre del grupo'
                }
            ],
            buttons: [
                {
                    text: 'Editar',
                    handler: data => {
                        loader.present();
                        if(data.nuevo_grupo.trim() == '' || data.nuevo_grupo == null){
                            this.showToast('Por favor ingrese un nombre válido.');
                            loader.dismiss();
                            return;
                        }
                        this.pharmagroupService.updateGroup(group._id, data.nuevo_grupo)
                            .subscribe(
                                data => {
                                    loader.dismiss();
                                    this.getAllGroups();
                                },
                                error => {
                                    loader.dismiss();
                                    if(error.status == 0){
                                        this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                    } else {
                                        this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                    }
                                    //this.showToast('Ha ocurrido un error al momento de editar el grupo, por favor intente de nuevo.')
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
}