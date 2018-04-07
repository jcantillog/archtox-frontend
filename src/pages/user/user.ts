import {Component, OnInit} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RolModel} from "../../model/rol.model";
import {NgForm} from "@angular/forms";
import {RolService} from "../../services/rol.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../model/user.model";
import {AccesoService} from "../../services/acceso.service";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit{

  private allroles: RolModel[] = [];
  private singlerol: string = "";
  private allusers: UserModel[] = [];
  private usersforfilter: UserModel[] = [];
  private noInfo: boolean = false;
  private edition: boolean = false;
  private _idUser: string;
  private _idAcceso: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private rolService: RolService, private toastCtrl: ToastController,
              private userService: UserService, private loadingCtrl: LoadingController,
              private accesoService: AccesoService, private events: Events) {}

  ngOnInit(){
    this.getAllRoles();
    this.getAllUsers();
  }

  onSubmit(form: NgForm){
      if(form.value.contraseña != form.value.contraseña2){
          this.showToast('Las contraseñas no coinciden, por favor verifique.')
      } else {
          let loader = this.loadingCtrl.create({
              content: "Agregando usuario..."
          });
          loader.present();
          this.userService.addUser(form.value.identificacion, this.singlerol, form.value.nombre,
              form.value.apellidos, form.value.correo, form.value.contraseña)
              .subscribe(
                  data => {
                      loader.dismiss();
                      this.showToast("Usuario agregado con éxito.");
                      this.getAllUsers();
                      this.limpiarFormulario(form);
                  },
                  error => {
                      loader.dismiss();
                      if(error.status == 0){
                          this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                      } else {
                          this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                      }
                      //this.showToast('Ha ocurrido un error al momento de agregar el usuario: '+ error.error +'. Por favor actualice la página.')
                  }
              )
      }
  }

  getAllRoles(){
    this.rolService.getRoles()
        .subscribe(
            (data: any) => {
              this.allroles = data;
              this.singlerol = this.allroles[0]._id;
            },
            error => {
                if(error.status == 0){
                    this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                } else {
                    this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                }
                //this.showToast('Ha ocurrido un error al momento de cargar los roles, por favor intente nuevamente.')
            }
        )
  }

  getAllUsers(){
      let loader = this.loadingCtrl.create({
          content: "Cargando usuarios..."
      });
      loader.present();
      this.userService.getUsers()
          .subscribe(
              (data: any) => {
                  loader.dismiss();
                  this.allusers = data;
                  this.initializeItems();
                  if(typeof this.usersforfilter == 'undefined' || this.usersforfilter.length == 0) this.noInfo = true;
                  else this.noInfo = false;
              },
              error => {
                  loader.dismiss();
                  if(error.status == 0){
                      this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                  } else {
                      this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                  }
                  //this.showToast('Ha ocurrido un error al momento de cargar los usuarios, por favor actualice la página.')
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
      this.usersforfilter = this.allusers;
  }

  getItems(ev: any) {
        let fullname: string;
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.usersforfilter = this.usersforfilter.filter((user) => {
                fullname = user.nombre+" "+user.apellidos;
                return (fullname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                        user.id_user.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

        if(typeof this.usersforfilter == 'undefined' || this.usersforfilter.length == 0) this.noInfo = true;
        else this.noInfo = false;
  }

  limpiarFormulario(form: NgForm){
      form.reset();
      this.edition = false;
  }

  llenarFormulario(form: NgForm, user: UserModel){
      form.reset({identificacion: user.id_user,
                        nombre: user.nombre,
                        select: user.id_rol,
                        apellidos: user.apellidos,
                        correo: user.correo,
                        contraseña: "",
                        contraseña2: ""})
  }

  edit(form: NgForm, user: UserModel){
      let loader = this.loadingCtrl.create({
          content: "Obteniendo datos de acceso del usuario..."
      });
      loader.present();
      this.accesoService.getAcceso(user.id_user)
          .subscribe(
              (data: any) => {
                  loader.dismiss();
                  this._idUser = user._id;
                  this._idAcceso = data._id;
                  this.edition = true;
                  form.reset({identificacion: user.id_user,
                      nombre: user.nombre,
                      select: user.id_rol,
                      apellidos: user.apellidos,
                      correo: user.correo,
                      contraseña: data.key_pass,
                      contraseña2: data.key_pass})
              },
              error => {
                  loader.dismiss();
                  if(error.status == 0){
                      this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                  } else {
                      this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                  }
                  //this.showToast('Ha ocurrido un error al momento de obtener los dato de acceso del usuario: '+ error.error +'. Por favor seleccione al usuario nuevamente.')
              }
          );
  }

  editUser(form: NgForm){
      if(form.value.contraseña != form.value.contraseña2){
          this.showToast('Las contraseñas no coinciden, por favor verifique.')
      } else {
          let loader = this.loadingCtrl.create({
              content: "Editando usuario..."
          });
          loader.present();
          this.userService.updateUser(this._idUser, form.value.identificacion, this.singlerol, form.value.nombre,
              form.value.apellidos, form.value.correo)
              .subscribe(
                  data => {
                      this.accesoService.updateAcceso(this._idAcceso, form.value.identificacion, form.value.contraseña)
                          .subscribe(
                              data => {
                                  loader.dismiss();
                                  this.showToast("Usuario editado con éxito.");
                                  this.getAllUsers();
                                  this.limpiarFormulario(form);
                              },
                              error => {
                                  loader.dismiss();
                                  if(error.status == 0){
                                      this.events.publish('system:errorHandler', "Tiempo de sesión finalizado", "Fármaco", 401);
                                  } else {
                                      this.events.publish('system:errorHandler', error.error+", "+error.statusText, "Fármaco", error.status);
                                  }
                                  //this.showToast('Ha ocurrido un error al momento de modificar la contraseña del usuario: '+ error.error +'. Por favor intente de nuevo.')
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
                      //this.showToast('Ha ocurrido un error al momento de agregar el usuario: '+ error.error +'. Por favor actualice la página.')
                  }
              )
      }
  }
}
