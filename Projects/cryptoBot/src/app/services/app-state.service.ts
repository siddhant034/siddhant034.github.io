import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppStateService {

  binance: Observable<any>;
  binanceBehaviourSubject : BehaviorSubject<any>;

  constructor() { 
    this.binanceBehaviourSubject = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.binance = this.binanceBehaviourSubject.asObservable();
  }

  update(binance){
    this.binanceBehaviourSubject.next(Object.assign({},this.binance));
  }

}
