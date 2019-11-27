import { NgModule } from '@angular/core';

import { CanvasComponent } from './canvas.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [CanvasComponent]
})
export class CanvasModule { }
