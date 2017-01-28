import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { UnderService } from '../../services/under.service'
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [UnderService, Geolocation]
})
export class AboutPage {
  public under: any;
  public curLoc: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private underService: UnderService) {
  }

  ionViewWillEnter(){
    if (this.navParams.data && this.navParams.data.under) {
      this.under = this.navParams.get('under');
    } else {
      this.hereNow();
    }
  }
  ionViewWillLeave(){
    this.navParams.data = undefined;
  }
  hereNow():void {
    let loading = this.loadingCtrl.create();
    loading.present();
    Geolocation.getCurrentPosition(
          {enableHighAccuracy: true})
        .then((resp) => {
         let loc = {
           lat: resp.coords.latitude,
           lng: resp.coords.longitude
         };
         this.underService.getUnder(loc)
         .then(UnderData => {
           this.under = UnderData;
           loading.dismiss();
        })
        .catch((error) => {
          console.log('Error getting location', error);
        });
      });
  }
}
