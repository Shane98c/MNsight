import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { UnderService } from '../../services/under.service'
import { LocService } from '../../services/loc.service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [UnderService, LocService]
})
export class AboutPage {
  public under: any;
  public curLoc: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private underService: UnderService, public locService: LocService) {
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
    this.under = undefined;
  }
  hereNow():void {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.locService.getCurrentPosition()
      .subscribe(
        res => {
          let loc = {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          };
          this.underService.getUnder(loc)
          .then(UnderData => {
            this.under = UnderData;
            loading.dismiss();
           })
           .catch(ex => {
             console.error('Error getting Geology', ex);
             alert('Error finding geological information');
             loading.dismiss();
           });
        },
        err => {
          alert('Geolocation unavailable.')
        }
    );
  }
}
