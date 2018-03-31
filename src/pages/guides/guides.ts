import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {PharmacologicalGroupPage} from "../pharmacological-group/pharmacological-group";
import {DrugPage} from "../drug/drug";

@IonicPage()
@Component({
  selector: 'page-guides',
  templateUrl: 'guides.html',
})
export class GuidesPage {
  pharmacologicalGroupPage = PharmacologicalGroupPage;
  drugPage = DrugPage;
}
