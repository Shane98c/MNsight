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
  public mapClip: string;
  constructor(private navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter(){
    this.under = this.navParams.get('under');
    let loc = {
      lat: this.under.point['epsg:4326'][1],
      lng: this.under.point['epsg:4326'][0]
    }
    this.buildMapClip(loc);
  }
  buildMapClip(loc):void {
    this.mapClip = [
      'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/static/pin-s(',
      loc.lng,',',loc.lat,
      ')/',
      loc.lng,',',loc.lat,
      ',12,0,0/800x325@2x?access_token=pk.eyJ1Ijoic2hhbmU5OGMiLCJhIjoiY2o3dzk2anVtMG5hOTMzbzIyZzZja3ZhMyJ9.JdJS0IEbZZ7S6r3Nr87MJg'
    ].join('');
  }
  showInfoPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

}
