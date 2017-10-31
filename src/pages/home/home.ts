import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl';
import { AboutPage } from '../about/about';
import { UnderService } from '../../shared/under.service';
import { LocService } from '../../shared/loc.service';
import { layers } from '../../shared/layers';
import * as ArcGISRasterTileSource from 'mapbox-gl-arcgis-tiled-map-service';
import { PopoverPage } from '../../shared/popover';

const accessToken = 'pk.eyJ1Ijoic2hhbmU5OGMiLCJhIjoiY2o3dzk2anVtMG5hOTMzbzIyZzZja3ZhMyJ9.JdJS0IEbZZ7S6r3Nr87MJg';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UnderService, LocService]
})
export class HomePage {
  public map: any;
  public currentLocation: any;
  public locationMarker: any;
  public bounds:number[][] = [
    [-97.53662, 42.994854], // Southwest coordinates
    [-89.49462, 49.24472443]  // Northeast coordinates
  ];
  constructor(public underService: UnderService, public locService: LocService, public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    (mapboxgl as any).accessToken = accessToken;
  }
  ngOnInit(): void {
    this.mapCtrl();
  }
  mapCtrl(): void {
    this.map = new mapboxgl.Map({
      center: [-94.349, 45.989],
      zoom: 7,
      maxBounds: this.bounds,
      maxZoom: 17,
      minZoom: 7,
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v9?optimize=true'
    });
    this.map.on('load', () => {
      //setup initial map state
      this.map.addSourceType('arcgisraster', ArcGISRasterTileSource, function(err) {
        if(err){
          console.log('error adding source');
        }
      });
      this.map.addSource('mnLidar', layers.mnLidarSource);
      this.map.addSource('colorTopo', layers.colorTopoSource);
      this.map.addLayer(layers.mnLidarLayer, 'tunnel-secondary-tertiary case');
      this.map.addLayer(layers.colorTopoLayer, 'tunnel-secondary-tertiary case');
      this.map.setPaintProperty('colorTopo', 'raster-opacity', 0.25);
      let nav = new mapboxgl.NavigationControl();
      this.map.dragRotate.disable();
      this.map.touchZoomRotate.disableRotation();
      this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 100, unit: 'metric'}), 'top-left');
      this.map.addControl(new mapboxgl.AttributionControl(), 'bottom-right');
      this.addLocationMarker(8);
    })
    this.map.on('click', (e) => {
      this.getTappedGeo(e);
      //add marker in the future
    });
  }
  addLocationMarker(zoom): void {
    let el = document.createElement('div');
    el.id = 'marker';
    this.locationMarker = new mapboxgl.Marker(el, {offset: [-18/2, -18/2]});
    this.locService.watchLocation()
      .subscribe(
        res => {
          console.log(res)
          if (res.coords) {
            this.currentLocation = [res.coords.longitude, res.coords.latitude];
            this.locationMarker
              .setLngLat(this.currentLocation)
              .addTo(this.map);
          } else {
            let toast = this.toastCtrl.create({
              message: 'Geolocation unavailable',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        }
    );

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
      let toast = this.toastCtrl.create({
        message: 'Error finding geological information.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  hereNow():void {
    if (this.currentLocation) {
      let loading = this.loadingCtrl.create();
      loading.present();
      let loc = {
        lat: this.currentLocation[1],
        lng: this.currentLocation[0]
      };
      this.underService.getUnder(loc)
      .then(UnderData => {
        this.renderData(UnderData);
        loading.dismiss();
       })
       .catch(ex => {
         console.error('Error getting Geology', ex);
         loading.dismiss();
         let toast = this.toastCtrl.create({
           message: 'Error finding geological information.',
           duration: 3000,
           position: 'top'
         });
         toast.present();
       });
    } else {
      let toast = this.toastCtrl.create({
        message: 'current location unknown.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
  fabLocate(): void {
    let center = this.currentLocation;
    this.locationMarker.remove();
    this.locationMarker
      .setLngLat(center)
      .addTo(this.map);
    this.map.flyTo({center: center, zoom: 15});
  }
  renderData(under): void {
    this.navCtrl.push(AboutPage, {
      under: under
    });
  }
  showInfoPopover(event: Event) {
    event.stopPropagation();
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }
  private topoVis = true;
  toggleHillshade() {
    this.topoVis =! this.topoVis;
    if (this.topoVis === false) {
      this.map.setPaintProperty('mnLidar', 'raster-opacity', 0);
      this.map.setPaintProperty('colorTopo', 'raster-opacity', 0);
    } else {
      this.map.setPaintProperty('mnLidar', 'raster-opacity', 1);
      this.map.setPaintProperty('colorTopo', 'raster-opacity', 0.25);
    }
  }
}
