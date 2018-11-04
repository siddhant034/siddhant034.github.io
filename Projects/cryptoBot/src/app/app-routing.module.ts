import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { MarketComponent } from './components/market/market.component';

export const routes: Routes = [

  { path: '', component: WelcomeScreenComponent },
  {
    path: 'crypto-bot', component: WelcomeScreenComponent,
    children: [
      { path: 'market', component: MarketComponent },
      { path: 'welcome-screen', component: WelcomeScreenComponent }
    ]
  }
]

@NgModule({
  exports: [RouterModule]
})

export class AppRoutingModule { }
