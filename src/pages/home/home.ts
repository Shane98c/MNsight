import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about'
import { UnderService } from '../../services/under.service'
import { LocService } from '../../services/loc.service'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl-dev';
// import { Map } from 'mapbox-gl';
// import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UnderService, LocService]
})
export class HomePage {
  public map : any;
  constructor(public underService: UnderService, public locService: LocService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ';
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
      this.map.addSource('mnLidar', {
        'type': 'arcgisraster',
        "url":"http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mn_hillshade_web_mercator/MapServer?f=json",
        "tileSize": 256
      });
      this.map.addSource('colorTopo', {
        'type': 'arcgisraster',
        "url":"http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/elevation_mn_1mDEM_cache/MapServer?f=json",
        "tileSize": 256
      });
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
      let loading = this.loadingCtrl.create();
      loading.present();
      this.underService.getUnder(e.lngLat)
      .then(UnderData => {
        this.renderData(UnderData);
        loading.dismiss();
      })
      .catch(ex => {
        console.error('Error getting Geology', ex);
        alert('Error finding geological information');
        loading.dismiss();
      });
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
