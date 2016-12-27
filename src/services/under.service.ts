import { Injectable } from '@angular/core';
import { UnderData } from './mockUnder';

@Injectable()
export class UnderService {
  getUnder() {
    console.log('gettingUnder', UnderData);
    return UnderData;
  }
}
