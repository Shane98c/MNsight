import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { UnderService } from '../../shared/under.service'
import { LocService } from '../../shared/loc.service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [UnderService, LocService]
})
export class AboutPage {
  public under: any;
  public curLoc: any;
  public mapClip: string;
  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private underService: UnderService, public locService: LocService) {
  }

  ionViewWillEnter(){
    if (this.navParams.data && this.navParams.data.under) {
      this.under = this.navParams.get('under');
      let loc = {
        lat: this.under.point['epsg:4326'][1],
        lng: this.under.point['epsg:4326'][0]
      }
      this.buildMapClip(loc);
    } else {
      this.hereNow();
    }
  }
  ionViewWillLeave(){
    this.navParams.data = undefined;
    this.under = undefined;
  }
  buildMapClip(loc):void {
    this.mapClip = [
      'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/pin-s(',
      loc.lng,',',loc.lat,
      ')/',
      loc.lng,',',loc.lat,
      ',10,0,0/800x325@2x?access_token=pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ'
    ].join('');
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
          this.buildMapClip(loc);
          this.underService.getUnder(loc)
          .then(UnderData => {
            this.under = UnderData;
            loading.dismiss();
           })
           .catch(ex => {
             console.error('Error getting Geology', ex);
             loading.dismiss();
             alert('Error finding geological information');
           });
        },
        err => {
          alert('Geolocation unavailable.')
        }
    );
  }
}
