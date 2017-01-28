import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { soils } from './soils';

@Injectable()
export class UnderService {
  private dnrURL = 'https://maps2.dnr.state.mn.us/cgi-bin/mapserv64?map=WUYH_MAPFILE&mode=nquery&qformat=json&mapxy=';
  constructor(private http: Http) { }

  getUnder(loc): Promise <any> {
    const url = [this.dnrURL, loc.lng, '+', loc.lat].join('');
    return this.http.get(url)
               .toPromise()
               .then(response => {
                 let formattedGeo = this.formatGeo(response.json().result);
                 return formattedGeo as any;
               })
               .catch(this.handleError);
              //  .catch(console.log('error'));
               //handle error later lol
  }
  handleError(): void {
    console.log('error');
  }

  formatGeo(geo) {
    if(geo.geology) {
      var geology = geo.geology;
      geology.soilName = soils[geology.soils];
      var layers = ["mesozoic_cretaceous","mesozoic_jurassic","paleozoic_cambrian","paleozoic_devonian","paleozoic_ordovician","precambrian_archean", "precambrian_proterozoic"];
      var i = 0;
      var layerArr = [];
      for (i = 0; i < layers.length; i++) {
        if (geology.hasOwnProperty(layers[i])){
          var layerName = layers[i].replace("_", " ");
          layerArr.push(geology[layers[i]] + ': (' +layerName+')');
          geology.geolLayerContent = layerArr;
        }
      }
    }
    return geo;
  }

}
