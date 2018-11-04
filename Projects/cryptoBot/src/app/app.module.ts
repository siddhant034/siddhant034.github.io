import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MarketComponent } from './components/market/market.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppStateService} from './services/app-state.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: "", component: WelcomeScreenComponent }])
  ],
  providers: [AppStateService],
  bootstrap: [AppComponent],
})
export class AppModule { }
