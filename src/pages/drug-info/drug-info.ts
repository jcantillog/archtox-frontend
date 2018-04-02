import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavParams, ToastController} from 'ionic-angular';
import {PharmagroupService} from "../../services/pharmagroup.service";
import {GroupModel} from "../../model/group.model";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage implements OnInit{

  private option: string = "";
  private allgroups: GroupModel[] = [];
  private singlegroup: string = "";

  constructor(private navParams: NavParams, private pharmagroupService: PharmagroupService,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  ngOnInit(){
      this.option = this.navParams.get('option');
  }

  ionViewWillEnter(){
    this.getAllGroups();
  }

  getAllGroups(){
        this.singlegroup="";
        this.pharmagroupService.getGroups()
            .subscribe(
                (data: any) => {
                    this.allgroups = data;
                },
                error => {
                    this.showToast('Ha ocurrido un error al momento de cargar los grupos, por favor actualice la página.')
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

  selectedGroup(){
    alert(this.singlegroup);
  }

  onSubmit(form: NgForm){
      alert(form.value.nombre);
  }

}
