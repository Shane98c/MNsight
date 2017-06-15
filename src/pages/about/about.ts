import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: []
})
export class AboutPage {
  public under: any;
  public mapClip: string;
  constructor(private navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.under = this.navParams.get('under');
    let loc = {
      lat: this.under.point['epsg:4326'][1],
      lng: this.under.point['epsg:4326'][0]
    }
    this.buildMapClip(loc);
  }
  ionViewWillLeave(){
    this.navParams.data = undefined;
    this.under = undefined;
  }
  buildMapClip(loc):void {
    this.mapClip = [
      'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/static/pin-s(',
      loc.lng,',',loc.lat,
      ')/',
      loc.lng,',',loc.lat,
      ',10,0,0/800x325@2x?access_token=pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ'
    ].join('');
  }

}
