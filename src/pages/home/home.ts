import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about'
import { UnderService } from '../../services/under.service'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
// import { Map } from 'mapbox-gl';
// import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // styleUrls: ['../theme/mapbox-gl.css'],
  providers: [UnderService]
})
export class HomePage {
  public map : any;
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
      let loading = this.loadingCtrl.create();
      loading.present();
      this.underService.getUnder(e.lngLat)
      .then(UnderData => {
        this.renderData(UnderData);
        loading.dismiss();
      });
      // this.map.addControl(new mapboxgl.NavigationControl());
    });
  }
  renderData(under): void {
    this.navCtrl.push(AboutPage, {
      under: under
    });
  }
}
