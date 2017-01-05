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
      constructor(private underService: UnderService) {
      }
      ngOnInit() {
        this.MapCtrl();
      }
      getBelow(): void {
        this.underService.getUnder();
      }
      MapCtrl = () => {
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
        map.on('click', function (e) {
          console.log(this);
          this.getBelow();
        });
      }

  }
