import { Component } from '@angular/core';
import {PharmacologicalGroupPage} from "../pharmacological-group/pharmacological-group";
import {DrugPage} from "../drug/drug";
import {AntidotePage} from "../antidote/antidote";

@Component({
  selector: 'page-guides',
  templateUrl: 'guides.html',
})
export class GuidesPage {
  pharmacologicalGroupPage = PharmacologicalGroupPage;
  drugPage = DrugPage;
  antidotePage = AntidotePage;
}
