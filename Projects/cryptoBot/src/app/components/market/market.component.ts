import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  providers: []
})
export class MarketComponent implements OnInit {

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.appStateService.binance.subscribe(x => {
      console.log(x);
    })
  }

}
