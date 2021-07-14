import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XtcComponent } from './xtc/xtc.component';

@NgModule({
  declarations: [
    AppComponent,
    XtcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	//HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
