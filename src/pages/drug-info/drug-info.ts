import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {PharmagroupService} from "../../services/pharmagroup.service";
import {GroupModel} from "../../model/group.model";
import {NgForm} from "@angular/forms";
import {InfofarmacoService} from "../../services/infofarmaco.service";
import {DrugModel} from "../../model/drug.model";
import {InfodrugModel} from "../../model/infodrug.model";
import {FarmacoService} from "../../services/farmaco.service";

@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage implements OnInit{

  private option: string = "";
  private drug: DrugModel;
  private infodrug: InfodrugModel;
  private allgroups: GroupModel[] = [];
  private singlegroup: string = "";

  @ViewChild('drug') drugForm: NgForm;

  constructor(private navParams: NavParams, private pharmagroupService: PharmagroupService,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private infoFarmacoService: InfofarmacoService, private navCtrl: NavController,
              private farmacoService: FarmacoService, private events: Events) {}

  ngOnInit(){
      this.option = this.navParams.get('option');
      if(this.option == "Editar"){
          this.drug = this.navParams.get('drug');
          this.getInfoFarmaco();
      }
  }

  ionViewWillEnter(){
    this.getAllGroups();
  }

  getAllGroups(){
        this.pharmagroupService.getGroups()
            .subscribe(
                (data: any) => {
                    this.allgroups = data;
                    if(this.option == "Nuevo"){
                        this.singlegroup = this.allgroups[0]._id;
                    }
                    if(this.option == "Editar"){
                        this.singlegroup = this.drug.id_grupo_farmaco;
                    }
                },
                error => {
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

  onSubmit(form: NgForm){
      let loader = this.loadingCtrl.create({
          content: "Agregando fármaco..."
      });
      loader.present();
      this.farmacoService.addFarmaco(this.singlegroup, form.value.nombre, form.value.molecula, form.value.nombres)
          .subscribe(
              (data: DrugModel) => {
                  this.infoFarmacoService.addInfoFarmaco(data._id, form.value.tratamiento,
                      form.value.eliminacion, form.value.paciente, form.value.absorcion, form.value.terapia)
                      .subscribe(
                          data => {
                              loader.dismiss();
                              this.showToast('Fármaco agregado con éxito.');
                              this.navCtrl.pop();
                          },
                          error => {
                              loader.dismiss();
                              if(error.status == 0){
                                  this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                              } else {
                                  this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                              }
                              //this.showToast('Ha ocurrido un error al momento de agregar la información del fármaco, por favor intente de nuevo.')
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
                  //this.showToast('Ha ocurrido un error al momento de agregar el fármaco, por favor intente de nuevo.')
              }
          )
  }

  onEdit(form: NgForm){
      let loader = this.loadingCtrl.create({
          content: "Editando fármaco..."
      });
      loader.present();
      this.farmacoService.updateFarmaco(this.drug._id, this.singlegroup, form.value.nombre, form.value.molecula, form.value.nombres)
          .subscribe(
              (data: DrugModel) => {
                  this.infoFarmacoService.updateInfoFarmaco(this.infodrug._id, this.drug._id, form.value.tratamiento,
                      form.value.eliminacion, form.value.paciente, form.value.absorcion, form.value.terapia)
                      .subscribe(
                          data => {
                              loader.dismiss();
                              this.showToast('Fármaco editado con éxito.');
                              this.navCtrl.pop();
                          },
                          error => {
                              loader.dismiss();
                              if(error.status == 0){
                                  this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                              } else {
                                  this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                              }
                              //this.showToast('Ha ocurrido un error al momento de editar la información del fármaco, por favor intente de nuevo.')
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
                  //this.showToast('Ha ocurrido un error al momento de editar el fármaco, por favor intente de nuevo.')
              }
          )
  }

  getInfoFarmaco(){
      let loader = this.loadingCtrl.create({
          content: "Cargando información del fármaco..."
      });
      loader.present();
      this.infoFarmacoService.getInfoFarmaco(this.drug._id)
          .subscribe(
              (data: any) => {
                  loader.dismiss();
                  this.infodrug = data;
                  this.drugForm.reset({nombre: this.drug.nombre,
                      molecula: this.drug.molecula,
                      nombres: this.drug.nombres,
                      tratamiento: this.infodrug.tratamiento,
                      eliminacion: this.infodrug.eliminacion,
                      paciente: this.infodrug.paciente,
                      absorcion: this.infodrug.absorcion,
                      terapia: this.infodrug.terapia
                  })
                  this.singlegroup = this.drug.id_grupo_farmaco;
              }, error => {
                  loader.dismiss();
                  if(error.status == 0){
                      this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                  } else {
                      this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                  }
                  //this.showToast('Ha ocurrido un error al momento de cargar los fármacos, por favor actualice la página.');
                  this.navCtrl.pop();
              }
          );
  }

}
