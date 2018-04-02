import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RolModel} from "../../model/rol.model";
import {NgForm} from "@angular/forms";
import {RolService} from "../../services/rol.service";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit{

  private allroles: RolModel[] = [];
  private singlerol: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private rolService: RolService, private toastCtrl: ToastController) {}

  ngOnInit(){
    this.getAllRoles();
  }

  onSubmit(form: NgForm){

  }

  getAllRoles(){
    this.rolService.getRoles()
        .subscribe(
            (data: any) => {
              this.allroles = data;
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

}
