import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocService {
  public opts = {enableHighAccuracy:true, maximumAge:30000, timeout:15000};
  constructor() {}
  watchLocation(): Observable<any> {
      return Observable.create(observer => {
        window.navigator.geolocation.watchPosition((position) => {
            observer.next(position);
        }, (error) => {
            switch (error.code) {
                case 1:
                    observer.error('errors.location.permissionDenied');
                    break;
                case 2:
                    observer.error('errors.location.positionUnavailable');
                    break;
                case 3:
                    observer.error('errors.location.timeout');
                    break;
            }
        }, this.opts);
      });
  }
}
