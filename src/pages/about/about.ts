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
  public loading = this.loadingCtrl.create();
  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private underService: UnderService) {
  }

  ionViewWillEnter(){
    if (this.navParams.data && this.navParams.data.under) {
      this.under = this.navParams.get('under');
    } else {
      this.hereNow();
      this.loading.present();
    }
  }
  ionViewWillLeave(){
    this.navParams.data = undefined;
  }
  hereNow():void {
    Geolocation.getCurrentPosition(
          {enableHighAccuracy: true})
        .then((resp) => {
         let loc = {
           lat: resp.coords.latitude,
           lng: resp.coords.longitude
         };
         console.log(loc);
         this.underService.getUnder(loc)
         .then(UnderData => {
           this.under = UnderData;
           this.loading.dismiss();
           console.log(this.under);
        })
        .catch((error) => {
          console.log('Error getting location', error);
        });
      });
  }
}
