import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// 'https://maps2.dnr.state.mn.us/cgi-bin/mapserv64?map=WUYH_MAPFILE&mode=nquery&qformat=json&mapxy=',e.latlng.lng, '+', e.latlng.lat].join('');

@Injectable()
export class UnderService {
  private dnrURL = 'https://maps2.dnr.state.mn.us/cgi-bin/mapserv64?map=WUYH_MAPFILE&mode=nquery&qformat=json&mapxy=';
  constructor(private http: Http) { }

  getUnder(loc): Promise <any> {
    const url = [this.dnrURL, loc.lng, '+', loc.lat].join('');
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().result as any)
               .catch(this.handleError);
              //  .catch(console.log('error'));
               //handle error later lol
  }
  handleError(): void {
    console.log('error');
  }
}
