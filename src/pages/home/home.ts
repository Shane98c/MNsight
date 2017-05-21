import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl-dev';
import { AboutPage } from '../about/about'
import { UnderService } from '../../shared/under.service'
import { LocService } from '../../shared/loc.service'
import { layers } from '../../shared/layers'

const accessToken = 'pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UnderService, LocService]
})
export class HomePage {
  public map: any;
  constructor(public underService: UnderService, public locService: LocService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    (mapboxgl as any).accessToken = accessToken;
  }
  ngOnInit(): void {
    this.mapCtrl();
  }
  mapCtrl(): void {
    let bounds:number[][]  = [
      [-97.53662, 42.994854], // Southwest coordinates
      [-89.49462, 49.24472443]  // Northeast coordinates
    ]
    this.map = new mapboxgl.Map({
      center: [-94.349742, 45.98909],
      zoom: 7,
      maxBounds: bounds,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.map.on('load', () => {
      this.map.addSource('mnLidar', layers.mnLidar);
      this.map.addSource('colorTopo', layers.colorTopo);
      this.map.addLayer({
         'id': 'mnLidar',
         'type': 'raster',
         'source':"mnLidar",
         'maxzoom': 20,
         'minzoom': 7
       }, 'waterway-river-canal');
     this.map.addLayer({
        'id': 'colorTopo',
        'type': 'raster',
        'source':"colorTopo",
        'maxzoom': 20,
        'minzoom': 7
      }, 'waterway-river-canal');
    this.map.setPaintProperty('colorTopo', 'raster-opacity', 0.25);
    })
    this.map.on('click', (e) => {
      this.getTappedGeo(e);
      //add marker in the future
    });
  }
  getTappedGeo(e): void {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.underService.getUnder(e.lngLat)
    .then(UnderData => {
      this.renderData(UnderData);
      loading.dismiss();
    })
    .catch(ex => {
      console.error('Error getting Geology', ex);
      loading.dismiss();
      alert('Error finding geological information');
    });
  }
  fabLocate(): void {
    this.locService.getCurrentPosition()
      .subscribe(
        res => {
          let center: number[] = [res.coords.longitude, res.coords.latitude]
          this.map.flyTo({center: center, zoom: 17});
        },
        err => {
          alert('Geolocation unavailable.')
        }
    );
  }
  renderData(under): void {
    this.navCtrl.push(AboutPage, {
      under: under
    });
  }
}
