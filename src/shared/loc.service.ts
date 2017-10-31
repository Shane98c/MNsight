import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocService {
  public opts = {enableHighAccuracy:true, maximumAge:30000, timeout:15000};
  constructor(private geolocation: Geolocation) {}
  watchLocation(): Observable<any> {
    let watch = this.geolocation.watchPosition(this.opts);
    return watch;
  }
}
