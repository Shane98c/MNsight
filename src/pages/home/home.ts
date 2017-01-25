import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about'
import { UnderService } from '../../services/under.service'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

// import { Map } from 'mapbox-gl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UnderService]
})
export class HomePage {
  public map : any;
  serv:UnderService;
  constructor(public underService: UnderService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ';
  }
  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      center: [-94.349742, 45.98909],
      zoom: 5,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.MapCtrl();
  }
  MapCtrl(): void {
    this.map.on('click', (e) => {
      console.log(e.lngLat);
      let underReturn: any;
      let loading = this.loadingCtrl.create();
      loading.present();
      this.underService.getUnder(e.lngLat)
      .then(UnderData => {
        underReturn = UnderData;
        this.renderData(underReturn);
        loading.dismiss();
      });
    });
  }
  renderData(under): void {
    console.log('inrender', under);
    this.navCtrl.push(AboutPage, {
      under: under
    });
  }
}
