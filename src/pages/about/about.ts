import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../shared/popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: []
})
export class AboutPage {
  public under: any;
  constructor(private navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter(){
    this.under = this.navParams.get('under');
  }
  showInfoPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

}
