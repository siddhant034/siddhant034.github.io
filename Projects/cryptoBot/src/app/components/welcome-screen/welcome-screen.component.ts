import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  constructor(private router: Router,
  private appStateService : AppStateService) { }

  fGroup1; 

  ngOnInit() {
    this.fGroup1 = new FormGroup({
      apiKey: new FormControl(),
      apiSecret: new FormControl()
    })
  }

  navigateToMarket(secretValue, keyValue) {
    console.log(secretValue, keyValue);
    const binance = require('node-binance-api');
    binance.options({
      APIKEY: keyValue,
      APISECRET: secretValue,
      useServerTime: true,
      test: true
    });
    this.appStateService.update(binance);
    this.router.navigate(['/crypto-bot/market']);
  }

}
