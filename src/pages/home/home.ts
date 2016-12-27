import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { NavController } from 'ionic-angular';
import { UnderService } from '../../services/under.service';
mapboxgl.accessToken = 'pk.eyJ1IjoiZmx5b3ZlcmNvdW50cnkiLCJhIjoiNDI2NzYzMmYxMzI5NWYxMDc0YTY5NzRiMzdlZDIyNTAifQ.x4T-qLEzRQMNFIdnkOkHKQ'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UnderService]
})

export class HomePage {
      constructor(public underService: UnderService) {}
      ngAfterViewInit() {
           var map = new mapboxgl.Map({
               container: 'map',
               style: 'mapbox://styles/mapbox/streets-v9'
           });
            map.on('click', function (e) {
              this.getUnderReq();
            });
      }
      getUnderReq(): void {
        let underData = this.underService.getUnder();
      }
  }
