import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { XtcComponent } from './xtc.component';

@NgModule({
  declarations: [
    XtcComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [XtcComponent],
  providers: []
})
export class XTCModule { }
