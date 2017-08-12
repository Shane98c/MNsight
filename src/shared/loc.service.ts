import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocService {
  constructor() {}
  getCurrentPosition(): Observable<any> {
    let opts = {enableHighAccuracy:true, maximumAge:30000, timeout:27000}
      return Observable.create(observer => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            observer.next(position);
            observer.complete();
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
        }, opts);
      });
  }

  watchLocation(): Observable<any> {
    let opts = {enableHighAccuracy:true, maximumAge:30000, timeout:27000}
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
        }, opts);
      });
  }
}
