import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app.router';

import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FullScreenComponent } from './home/full-screen/full-screen.component';
import { PcWebComponent } from './home/pc-web/pc-web.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    HomeComponent,
    HeaderComponent,
    FullScreenComponent,
    PcWebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
