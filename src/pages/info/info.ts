import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: []
})
export class InfoPage {
  constructor(private navParams: NavParams) {
  }

}
