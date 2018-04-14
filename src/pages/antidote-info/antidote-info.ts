import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, LoadingController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {DrugModel} from "../../model/drug.model";
import {AntidoteService} from "../../services/antidote.service";
import {AntidoteModel} from "../../model/antidote.model";

@Component({
  selector: 'page-antidote-info',
  templateUrl: 'antidote-info.html',
})
export class AntidoteInfoPage implements OnInit{

  private antidote: AntidoteModel;

  @ViewChild('antidoteForm') antidoteForm: NgForm;

  constructor(private navParams: NavParams, private loadingCtrl: LoadingController,
              private antidoteService: AntidoteService, private toastCtrl: ToastController,
              private events: Events, private viewCtrl: ViewController) {
  }

  ngOnInit(){
    this.antidote = this.navParams.get('antidote');
  }

  ionViewDidEnter(){
      this.resetForm();
  }

  onEdit(form: NgForm){
        let loader = this.loadingCtrl.create({
            content: "Editando antídoto..."
        });
        loader.present();
        this.antidoteService.updateAntidote(this.antidote._id, form.value.nombre, form.value.descripcion)
            .subscribe(
                (data: DrugModel) => {
                    loader.dismiss();
                    this.showToast('Antídoto editado con éxito.');
                    this.viewCtrl.dismiss('antidote');
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

  resetForm(){
      this.antidoteForm.reset({nombre: this.antidote.nombre, descripcion: this.antidote.descripcion});
  }

}
