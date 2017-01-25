import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UnderService } from '../../services/under.service'
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [UnderService]

})
export class AboutPage {
  public under: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public underService: UnderService, public loadingCtrl: LoadingController) {
    this.under = this.navParams.get('under');
  }
  ngOnInit(): void {
    let underReturn: any;
    let loading = this.loadingCtrl.create();
    loading.present();
    let loc = {lng: -93, lat: 46.3}
    this.underService.getUnder(loc)
    .then(UnderData => {
      underReturn = UnderData;
      this.under = underReturn;
      loading.dismiss();
      });
  }
}
